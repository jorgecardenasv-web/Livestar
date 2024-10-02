import { TextInput } from "@tremor/react";
import { FormData } from "../schemas/form-schema";

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
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl">
          2
        </span>
        <h3 className="text-2xl font-bold text-gray-800">Datos de contacto</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mi whatsapp es
          </label>
          <TextInput
            name="whatsapp"
            placeholder=""
            value={formData.whatsapp}
            onChange={(e) => handleInputChange("whatsapp", e.target.value)}
            error={!!errors.whatsapp}
            errorMessage={errors.whatsapp}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mi correo es
          </label>
          <TextInput
            name="email"
            placeholder=""
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={!!errors.email}
            errorMessage={errors.email}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
