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
    <div className="space-y-6 py-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
          2
        </span>
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Datos de contacto
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Te contactaremos solo para compartirte tu cotización y resolver dudas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
    </div>
  );
};
