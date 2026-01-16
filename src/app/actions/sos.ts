// // @ts-nocheck
// 'use server';

// import prisma from '@/lib/prisma';
// import uniqId from 'generate-unique-id';
// import { getServerSession } from 'next-auth';

// export async function sos(coordinates: any) {
//   try {
//     const id = uniqId();
//     const session = await getServerSession();
//     const user = session?.user;
//     await prisma.reports.create({
//       data: {
//         id: id,
//         username: user?.name || '',
//         description: '',
//         category: 'SOS',
//         coordinates: coordinates,
//         status: 'cleared',
//       },
//     });

//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

// @ts-nocheck
'use server';

import prisma from '@/lib/prisma';
import uniqId from 'generate-unique-id';
import { getServerSession } from 'next-auth';

export async function sos(coordinates: any) {
  try {
    const id = uniqId();
    const session = await getServerSession();
    const user = session?.user;

    const data: any = {
      id: id,
      username: user?.name || '',
      description: '',
      category: 'SOS',
      status: 'pending',
    };

    // ✅ SAFETY CHECK: only add lat/lng if valid
    if (
      Array.isArray(coordinates) &&
      coordinates.length === 2 &&
      typeof coordinates[0] === 'number' &&
      typeof coordinates[1] === 'number'
    ) {
      data.latitude = coordinates[0];
      data.longitude = coordinates[1];
    }

    await prisma.reports.create({ data });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
