import { NextResponse, type NextRequest } from "next/server";
import { getAllProspectsByDateService } from "@/features/prospects/services/get-prospects.service";
import { prospectTransformer } from "@/features/prospects/transformers/prospect-transformer";

const formatToISO = (date: string) => {
  return new Date(date).toISOString().split(".")[0] + "Z";
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const startDate = searchParams.get("startDate") as string;
  const endDate = searchParams.get("endDate") as string;

  const prospects = await getAllProspectsByDateService({
    startDate: formatToISO(startDate),
    endDate: formatToISO(endDate),
  });
  const prospectTranformed = prospects.map((prospect) =>
    prospectTransformer(prospect as any)
  );

  const mapedProspect = prospectTranformed?.map((prospect) => ({
    Id: prospect.id,
    Nombre: prospect.name,
    Email: prospect.email,
    Asesor: prospect?.user ? prospect?.user?.name : "",
    "Email asesor": prospect?.user ? prospect?.user?.email : "",
    "Fecha de creación": prospect.createdAt,
  }));

  return NextResponse.json(mapedProspect);
}
