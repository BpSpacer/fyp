import { PrismaClient as PrismaClientSupabase } from '../../../prisma/generated/supabase-client'

const prismaClientSupabaseSingleton = () => {
  return new PrismaClientSupabase();
};

declare const globalThis: {
  prismaSupabaseGlobal: ReturnType<typeof prismaClientSupabaseSingleton>;
} & typeof global;

const prismaSupabase =
  globalThis.prismaSupabaseGlobal ?? prismaClientSupabaseSingleton();

export default prismaSupabase;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaSupabaseGlobal = prismaSupabase;
}


