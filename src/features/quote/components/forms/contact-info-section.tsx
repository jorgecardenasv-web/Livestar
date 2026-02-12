import { TextInput } from "@/shared/components/ui/text-input";
import { FormData } from "../../schemas/form-schema";

interface ContactInfoSectionProps {
  formData: FormData;
  errors: Record<string, string>;
  handleInputChange: (field: keyof FormData, value: string | number) => void;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  formData,
  errors,
  handleInputChange,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <TextInput
          type="text"
          label="Mi whatsapp es"
          id="whatsapp"
          name="whatsapp"
          placeholder="Ej: 3312456789"
          value={formData.whatsapp}
          onChange={(e) => {
            let value = e.target.value;
            value = value.replace(/\D/g, "");
            if (value.length <= 10) {
              handleInputChange("whatsapp", value);
            }
          }}
          className="w-full"
          error={errors.whatsapp}
        />

        <TextInput
          label="Mi correo es"
          id="email"
          name="email"
          placeholder="Ej: juanperez@gmail.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full"
          error={errors.email}
        />
    </div>
  );
};
