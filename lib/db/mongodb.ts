import "server-only";

import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { MongoClient, type Db, type MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME ?? "vietnam_property_platform";
const x509Username = process.env.MONGODB_X509_USERNAME;
const x509CertPath = process.env.MONGODB_X509_CERT_PATH;
const x509CertBase64 = process.env.MONGODB_X509_CERT_BASE64;

let clientPromise: Promise<MongoClient> | null = null;
let resolvedCertPathPromise: Promise<string> | null = null;

export async function getMongoDb(): Promise<Db> {
  const client = await getMongoClient();

  return client.db(dbName);
}

export async function getMongoClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (!x509Username) {
    throw new Error("Missing MONGODB_X509_USERNAME environment variable");
  }

  if (!clientPromise) {
    const certPath = await getX509CertificatePath();
    const connectionUri = withX509Username(uri, x509Username);
    const options: MongoClientOptions = {
      tls: true,
      tlsCertificateKeyFile: certPath,
    };

    clientPromise = new MongoClient(connectionUri, options).connect();
  }

  return clientPromise;
}

async function getX509CertificatePath() {
  if (x509CertPath) {
    return x509CertPath;
  }

  if (!x509CertBase64) {
    throw new Error(
      "Missing MongoDB X.509 certificate. Set MONGODB_X509_CERT_PATH locally or MONGODB_X509_CERT_BASE64 in deployment.",
    );
  }

  if (!resolvedCertPathPromise) {
    resolvedCertPathPromise = writeCertificateToTempFile(x509CertBase64);
  }

  return resolvedCertPathPromise;
}

async function writeCertificateToTempFile(certBase64: string) {
  const certPath = join(tmpdir(), "mongodb-x509.pem");
  await writeFile(certPath, Buffer.from(certBase64, "base64"), { mode: 0o600 });

  return certPath;
}

function withX509Username(connectionUri: string, username: string) {
  const url = new URL(connectionUri);

  if (!url.username) {
    url.username = username;
  }

  return url.toString();
}
