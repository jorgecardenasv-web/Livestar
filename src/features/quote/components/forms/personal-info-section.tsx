import { SelectInput } from "@/shared/components/ui/select-input";
import { TextInput } from "@/shared/components/ui/text-input";
import { genderOptions, whoOptions } from "../../data";
import { FormData } from "../../schemas/form-schema";
import { NumberInput } from "@/shared/components/ui/number-input";

interface PersonalInfoSectionProps {
  formData: FormData;
  errors: Record<string, string>;
  handleInputChange: (field: keyof FormData, value: string | number) => void;
  handleChildChange: (
    index: number,
    field: string,
    value: string | number
  ) => void;
  handleProtectedPersonChange: (
    index: number,
    field: string,
    value: string | number
  ) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  errors,
  handleInputChange,
  handleChildChange,
  handleProtectedPersonChange,
}) => {

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center space-x-4 mb-6">
        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl">
          1
        </span>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Datos Personales
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 dark:text-gray-400 mb-1">
        <TextInput
          label="Mi nombre es"
          name="name"
          placeholder="Ej: Juan Perez"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full"
          error={errors.name || ""}
        />

        <SelectInput
          options={genderOptions}
          error={errors.gender}
          label="Genero al nacer"
          name="gender"
          value={formData.gender}
          onValueChange={(value) => handleInputChange("gender", value)}
        />

        <TextInput
          type="text"
          label="Mi código postal es"
          name="postalCode"
          placeholder="Ej: 04000"
          value={formData.postalCode}
          onChange={(e) => {
            let value = e.target.value;
            value = value.replace(/\D/g, "");
            if (value.length <= 5) {
              handleInputChange("postalCode", value);
            }
          }}
          className="w-full"
          error={errors.postalCode || ""}
        />

        <SelectInput
          label="Quiero proteger a"
          name="protectWho"
          value={formData.protectWho}
          onValueChange={(value) => handleInputChange("protectWho", value)}
          error={errors.protectWho}
          options={whoOptions}
        />

        {(formData.protectWho === "mi_pareja_y_yo" ||
          formData.protectWho === "mis_hijos_y_yo" ||
          formData.protectWho === "solo_yo" ||
          formData.protectWho === "familia") && (
            <div className="space-y-6">
              <NumberInput
                label="Yo tengo"
                name="age"
                placeholder="Ej: 18"
                value={formData.age}
                onChange={(e) => handleInputChange("age", Number(e.target.value))}
                className="w-full"
                min={18}
                max={100}
                error={errors.age || ""}
              />
              
              {(formData.protectWho === "mi_pareja_y_yo" ||
                formData.protectWho === "familia") && (
                  <>
                    <SelectInput
                      options={genderOptions}
                      error={errors.partnerGender}
                      label="Género al nacer de mi pareja"
                      name="partnerGender"
                      value={formData.partnerGender}
                      onValueChange={(value) =>
                        handleInputChange("partnerGender", value)
                      }
                    />
                    <NumberInput
                      label="Mi pareja tiene"
                      id="partnerAge"
                      name="partnerAge"
                      placeholder="Ej: 18"
                      value={formData.partnerAge}
                      onChange={(e) =>
                        handleInputChange("partnerAge", Number(e.target.value))
                      }
                      className="w-full"
                      min={18}
                      max={100}
                      error={errors.partnerAge}
                    />
                  </>
                )}
            </div>
          )}

        {(formData.protectWho === "familia" ||
          formData.protectWho === "mis_hijos_y_yo" ||
          formData.protectWho === "solo_mis_hijos") && (
            <div className="space-y-6">
              <NumberInput
                label="Número de hijos"
                id="childrenCount"
                name="childrenCount"
                placeholder="Nº de hijos"
                value={formData.childrenCount}
                onChange={(e) =>
                  handleInputChange("childrenCount", Number(e.target.value))
                }
                className="w-full"
                min={1}
                error={errors.childrenCount}
              />
              {formData.childrenCount && formData.childrenCount > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    {formData.childrenCount === 1
                      ? "Datos de mi hijo"
                      : `Datos de mis ${formData.childrenCount} hijos`}
                  </label>
                  <div className="space-y-6">
                    {Array.from({ length: formData.childrenCount }).map(
                      (_, index) => (
                        <div
                          key={index}
                          className="space-y-4"
                        >
                          <NumberInput
                            label="Edad"
                            id={`childAge${index}`}
                            name={`childAge${index}`}
                            placeholder="Edad"
                            value={formData.children?.[index]?.age ?? 0}
                            onChange={(e) =>
                              handleChildChange(
                                index,
                                "age",
                                Number(e.target.value)
                              )
                            }
                            error={errors[`children.${index}.age`]}
                            className="w-full"
                            min={0}
                          />
                          <SelectInput
                            label="Género al nacer"
                            name={`childGender${index}`}
                            value={formData.children?.[index]?.gender ?? ""}
                            onValueChange={(value) =>
                              handleChildChange(index, "gender", value)
                            }
                            options={genderOptions}
                            error={errors[`children.${index}.gender`]}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        {formData.protectWho === "otros" && (
          <div className="space-y-6">
            <NumberInput
              label="¿Cuántas personas quieres asegurar?"
              id="protectedCount"
              name="protectedCount"
              placeholder="Nº de personas"
              value={formData.protectedCount}
              onChange={(e) =>
                handleInputChange("protectedCount", Number(e.target.value))
              }
              error={errors.protectedCount}
              className="w-full"
              min={1}
            />

            <div>
              {formData.protectedCount && formData.protectedCount > 0 && (
                <div className="space-y-6">
                  {Array.from({ length: formData.protectedCount }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="space-y-4"
                      >
                        <TextInput
                          id={`protectedRelationship${index}`}
                          name={`protectedRelationship${index}`}
                          placeholder="Ej: Hermano"
                          value={
                            formData.protectedPersons?.[index]?.relationship ||
                            ""
                          }
                          onChange={(e) =>
                            handleProtectedPersonChange(
                              index,
                              "relationship",
                              e.target.value
                            )
                          }
                          error={
                            errors[`protectedPersons.${index}.relationship`]
                          }
                          className="w-full"
                          label="Parentesco"
                        />

                        <NumberInput
                          label="Edad"
                          id={`protectedAge${index}`}
                          name={`protectedAge${index}`}
                          placeholder="Edad"
                          value={formData.protectedPersons?.[index]?.age || 0}
                          onChange={(e) =>
                            handleProtectedPersonChange(
                              index,
                              "age",
                              Number(e.target.value)
                            )
                          }
                          error={errors[`protectedPersons.${index}.age`]}
                          className="w-full"
                          min={0}
                        />

                        <SelectInput
                          label="Género"
                          name={`protectedGender${index}`}
                          value={
                            formData.protectedPersons?.[index]?.gender || ""
                          }
                          onValueChange={(value) =>
                            handleProtectedPersonChange(index, "gender", value)
                          }
                          error={errors[`protectedPersons.${index}.gender`]}
                          options={genderOptions}
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {formData.protectWho === "mis_padres" && (
          <div className="space-y-6">
            <TextInput
              type="text"
              label="Nombre de papá"
              name="dadName"
              placeholder="Ej: Juan Pérez"
              value={formData.dadName}
              onChange={(e) => handleInputChange("dadName", e.target.value)}
              error={errors.dadName}
              className="w-full"
            />

            <TextInput
              type="text"
              label="Nombre de mamá"
              name="momName"
              placeholder="Ej: María López"
              value={formData.momName}
              onChange={(e) => handleInputChange("momName", e.target.value)}
              error={errors.momName}
              className="w-full"
            />

            <NumberInput
              label="Edad de papá"
              name="dadAge"
              placeholder="Edad de papá"
              value={formData.dadAge}
              onChange={(e) =>
                handleInputChange("dadAge", Number(e.target.value))
              }
              error={errors.dadAge}
              className="w-full"
              min={18}
            />
            <NumberInput
              label="Edad de mamá"
              name="momAge"
              placeholder="Edad de mamá"
              value={formData.momAge}
              onChange={(e) =>
                handleInputChange("momAge", Number(e.target.value))
              }
              error={errors.momAge}
              className="w-full"
              min={18}
            />
          </div>
        )}
      </div>
    </div>
  );
};
