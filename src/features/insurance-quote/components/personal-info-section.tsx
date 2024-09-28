import { NumberInput, Select, SelectItem, TextInput } from "@tremor/react";
import { FormData } from "../schemas/form-schema";

interface PersonalInfoSectionProps {
  formData: FormData;
  errors: Record<string, string>;
  handleInputChange: (field: keyof FormData, value: string | number) => void;
  handleChildAgeChange: (index: number, value: number) => void;
  handleProtectedAgeChange: (index: number, value: number) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  errors,
  handleInputChange,
  handleChildAgeChange,
  handleProtectedAgeChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl">
          1
        </span>
        <h3 className="text-2xl font-bold text-gray-800">Datos Personales</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mi nombre es
          </label>
          <TextInput
            name="name"
            placeholder="Ej: Juan Perez"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            error={!!errors.name}
            errorMessage={errors.name}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Soy
          </label>
          <Select
            name="gender"
            placeholder="Seleccionar"
            value={formData.gender}
            onValueChange={(value) => handleInputChange("gender", value)}
            error={!!errors.gender}
          >
            <SelectItem value="hombre">Hombre</SelectItem>
            <SelectItem value="mujer">Mujer</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </Select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mi código postal es
          </label>
          <TextInput
            name="postalCode"
            placeholder="Ej: 04000"
            value={formData.postalCode}
            onChange={(e) => handleInputChange("postalCode", e.target.value)}
            error={!!errors.postalCode}
            errorMessage={errors.postalCode}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quiero proteger a
          </label>
          <Select
            name="protectWho"
            placeholder="Seleccionar"
            value={formData.protectWho}
            onValueChange={(value) => handleInputChange("protectWho", value)}
            error={!!errors.protectWho}
            errorMessage={errors.protectWho}
          >
            <SelectItem value="solo_yo">Solo yo</SelectItem>
            <SelectItem value="mi_pareja_y_yo">Mi pareja y yo</SelectItem>
            <SelectItem value="familia">Mi familia completa</SelectItem>
            <SelectItem value="mis_hijos_y_yo">Mis hijos y yo</SelectItem>
            <SelectItem value="solo_mis_hijos">Solo mis hijos</SelectItem>
            <SelectItem value="mis_padres">Mis padres</SelectItem>
            <SelectItem value="otros">Otro(s)</SelectItem>
          </Select>
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4">
          {(formData.protectWho === "mi_pareja_y_yo" ||
            formData.protectWho === "familia") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mi pareja es
              </label>
              <Select
                name="partnerGender"
                placeholder="Seleccionar"
                value={formData.partnerGender}
                onValueChange={(value) =>
                  handleInputChange("partnerGender", value)
                }
                error={!!errors.partnerGender}
                errorMessage={errors.partnerGender}
              >
                <SelectItem value="hombre">Hombre</SelectItem>
                <SelectItem value="mujer">Mujer</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </Select>
            </div>
          )}

          {(formData.protectWho === "mi_pareja_y_yo" ||
            formData.protectWho === "mis_hijos_y_yo" ||
            formData.protectWho === "solo_yo") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yo tengo
              </label>
              <NumberInput
                name="age"
                placeholder="Ej: 18"
                value={formData.age}
                onValueChange={(value) => handleInputChange("age", value)}
                error={!!errors.age}
                errorMessage={errors.age}
                className="w-full"
                min={0}
                max={100}
              />
            </div>
          )}

          {(formData.protectWho === "mi_pareja_y_yo" ||
            formData.protectWho === "familia") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mi pareja tiene
              </label>
              <NumberInput
                name="partnerAge"
                placeholder="Ej: 18"
                value={formData.partnerAge}
                onValueChange={(value) =>
                  handleInputChange("partnerAge", value)
                }
                error={!!errors.partnerAge}
                errorMessage={errors.partnerAge}
                className="w-full"
                min={0}
                max={100}
              />
            </div>
          )}
          {(formData.protectWho === "familia" ||
            formData.protectWho === "mis_hijos_y_yo" ||
            formData.protectWho === "solo_mis_hijos") && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de hijos
                </label>
                <NumberInput
                  name="childrenCount"
                  placeholder="Nº de hijos"
                  value={formData.childrenCount}
                  onValueChange={(value) =>
                    handleInputChange("childrenCount", value)
                  }
                  error={!!errors.childrenCount}
                  errorMessage={errors.childrenCount}
                  className="w-full"
                  min={1}
                  max={10}
                />
              </div>
              {formData.childrenCount && formData.childrenCount > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.childrenCount === 1
                      ? "Edad de mi hijo"
                      : `Edades de mis ${formData.childrenCount} hijos`}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.childrenAges?.map((age, index) => (
                      <NumberInput
                        key={index}
                        name={`childAge${index}`}
                        placeholder={`Hijo ${index + 1}`}
                        value={age}
                        onValueChange={(value) =>
                          handleChildAgeChange(index, value)
                        }
                        error={!!errors[`childrenAges.${index}`]}
                        errorMessage={errors[`childrenAges.${index}`]}
                        className="w-20"
                        min={0}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {formData.protectWho === "otros" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selecciona su parentesco contigo
                </label>
                <TextInput
                  name="relationship"
                  placeholder="Ej: hermanos, tios"
                  value={formData.relationship}
                  onChange={(e) =>
                    handleInputChange("relationship", e.target.value)
                  }
                  error={!!errors.relationship}
                  errorMessage={errors.relationship}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ¿Cuántos?
                </label>
                <NumberInput
                  name="protectedCount"
                  placeholder="Nº de protegidos"
                  value={formData.protectedCount}
                  onValueChange={(value) =>
                    handleInputChange("protectedCount", value)
                  }
                  error={!!errors.protectedCount}
                  errorMessage={errors.protectedCount}
                  className="w-full"
                  min={1}
                  max={10}
                />
              </div>

              <div className="col-span-2">
                {formData.protectedCount && formData.protectedCount > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {formData.protectedCount === 1
                        ? `Edad de mi ${formData.relationship}`
                        : `Edades de mis ${formData.protectedCount} ${formData.relationship}s`}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.protectedAges?.map((age, index) => (
                        <NumberInput
                          key={index}
                          name={`protectedAge${index}`}
                          placeholder={`Pariente ${index + 1}`}
                          value={age}
                          onValueChange={(value) =>
                            handleProtectedAgeChange(index, value)
                          }
                          error={!!errors[`protectedAges.${index}`]}
                          errorMessage={errors[`protectedAges.${index}`]}
                          className="w-20"
                          min={0}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {formData.protectWho === "mis_padres" && (
            <>
              <div className="flex flex-wrap gap-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de mamá
                </label>
                <TextInput
                  name="momName"
                  placeholder="Ej: Juan Perez"
                  value={formData.momName}
                  onChange={(e) => handleInputChange("momName", e.target.value)}
                  error={!!errors.momName}
                  errorMessage={errors.momName}
                  className="w-full"
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de papá
                </label>
                <TextInput
                  name="dadName"
                  placeholder="Ej: Juan Perez"
                  value={formData.dadName}
                  onChange={(e) => handleInputChange("dadName", e.target.value)}
                  error={!!errors.dadName}
                  errorMessage={errors.dadName}
                  className="w-full"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Edad de mamá
                </label>
                <NumberInput
                  name="momAge"
                  placeholder="Edad de mamá"
                  value={formData.momAge}
                  onValueChange={(value) => handleInputChange("momAge", value)}
                  error={!!errors.momAge}
                  errorMessage={errors.momAge}
                  className="w-full"
                  min={0}
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Edad de papá
                </label>
                <NumberInput
                  name="dadAge"
                  placeholder="Edad de papá"
                  value={formData.dadAge}
                  onValueChange={(value) => handleInputChange("dadAge", value)}
                  error={!!errors.dadAge}
                  errorMessage={errors.dadAge}
                  className="w-full"
                  min={0}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
