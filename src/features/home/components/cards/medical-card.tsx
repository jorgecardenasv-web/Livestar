import Image, { StaticImageData } from "next/image";

interface CardMedicalProps {
  title: string;
  description: string;
  image: StaticImageData;
}

export const MedicalExpenseCard: React.FC<CardMedicalProps> = ({
  description,
  image,
  title,
}) => {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 flex flex-col items-center text-center border border-slate-200/70">
      <div className="w-28 h-28 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Image
          src={image}
          width={90}
          height={90}
          className="object-cover"
          alt="Imagen de experiencia"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};
