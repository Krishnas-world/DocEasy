import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'DoctorsList'));
    const doctors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return new Response(JSON.stringify(doctors), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response('Error fetching data', { status: 500 });
  }
}
