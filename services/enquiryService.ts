import { getMockEnquiries } from "@/lib/repositories/mockRepository";
import type { Enquiry } from "@/types/enquiry";

// Future MongoDB-backed implementation:
// const db = await getMongoDb();
// return db.collection<Enquiry>("enquiries").find({}).toArray();
export async function getEnquiries() {
  return getMockEnquiries();
}

// Future backend integration point:
// Insert into MongoDB, sync to CRM, and trigger email/WhatsApp workflows.
export async function submitEnquiry(enquiry: Enquiry) {
  // const db = await getMongoDb();
  // await db.collection<Enquiry>("enquiries").insertOne(enquiry);

  return {
    ok: true,
    enquiry,
  };
}
