import type { ComponentType } from "react";
import { SelectInput } from "@/shared/components/ui/select-input";
import { TextInput } from "@/shared/components/ui/text-input";
import { genderOptions, whoOptions } from "../../data";
import { FormData } from "../../schemas/form-schema";
import { NumberInput } from "@/shared/components/ui/number-input";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/shared/components/ui/badge";
import {
  CheckCircle2,
  HeartHandshake,
  Home,
  User,
  UserCircle2,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";

interface BaseFormProps {
  formData: FormData;
  errors: Record<string, string>;
  handleInputChange: (field: keyof FormData, value: string | number) => void;
  onNextStep?: () => void;
}

interface PersonalInfoSectionProps extends BaseFormProps {
  isVerified?: boolean;
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
  showHeader?: boolean;
  disabled?: boolean;
}

type IconType = ComponentType<{ className?: string }>;

const descriptions: Record<string, string> = {
  solo_yo: "Protección individual para ti.",
  mi_pareja_y_yo: "Cobertura para ti y tu pareja.",
  familia: "Protege a todos los integrantes de tu familia.",
  mis_hijos_y_yo: "Cobertura para ti y tus hijos.",
  solo_mis_hijos: "Enfocado únicamente en tus hijos.",
  mis_padres: "Pensado para cuidar a tus padres.",
  otros: "Para otras personas importantes para ti.",
};

const icons: Record<string, IconType> = {
  solo_yo: User,
  mi_pareja_y_yo: Users,
  familia: Home,
  mis_hijos_y_yo: Users,
  solo_mis_hijos: UserPlus,
  mis_padres: UserCircle2,
  otros: HeartHandshake,
};

const cardConfig = whoOptions.map((option) => ({
  ...option,
  description: descriptions[option.value] ?? "",
  Icon: icons[option.value] ?? User,
}));

export const ProtectionStep: React.FC<BaseFormProps> = ({
  formData,
  errors,
  handleInputChange,
  onNextStep,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-xs sm:text-sm text-muted-foreground">
        Selecciona una opción para comenzar tu cotización.
      </p>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
        {cardConfig.map(({ value, label, description, Icon }) => {
          const isSelected = formData.protectWho === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                handleInputChange("protectWho", value);
                if (onNextStep) {
                  onNextStep();
                }
              }}
              className={`relative flex flex-col items-start gap-2 rounded-xl border bg-white px-3 py-2.5 sm:px-3.5 sm:py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isSelected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/60"
                  : "border-slate-200 hover:border-primary/40 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                {isSelected && (
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                )}
              </div>
              <div className="w-full">
                <p className="text-sm sm:text-[15px] font-semibold text-gray-900 leading-tight">
                  {label}
                </p>
                {description && (
                  <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
                    {description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {errors.protectWho && (
        <p className="mt-2 text-sm text-destructive">{errors.protectWho}</p>
      )}
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  errors,
  isVerified,
  handleInputChange,
  handleChildChange,
  handleProtectedPersonChange,
  showHeader = true,
  disabled = false,
}) => {
  const showAge = [
    "mi_pareja_y_yo",
    "mis_hijos_y_yo",
    "solo_yo",
    "familia",
  ].includes(formData.protectWho);
  const showPartner = ["mi_pareja_y_yo", "familia"].includes(
    formData.protectWho
  );
  const showChildren = [
    "familia",
    "mis_hijos_y_yo",
    "solo_mis_hijos",
  ].includes(formData.protectWho);
  const showOthers = formData.protectWho === "otros";
  const showParents = formData.protectWho === "mis_padres";

  return (
    <div className="space-y-6 py-2">
      {showHeader && (
        <div className="flex items-center justify-between gap-4 mb-2">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              Datos personales
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Esta información nos ayuda a ajustar tu cotización a tu familia.
            </p>
          </div>
          {isVerified !== undefined && (
            <div className="ml-auto sm:ml-4">
              {isVerified ? (
                <Badge variant="success" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Verificado
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="gap-1 text-muted-foreground"
                >
                  <XCircle className="h-3 w-3" />
                  No verificado
                </Badge>
              )}
            </div>
          )}
        </div>
      )}

      <div className="space-y-6 dark:text-gray-400 mb-1">
        <div>
          <p className="text-[11px] sm:text-xs font-medium uppercase tracking-wide text-slate-500">
            Titular
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TextInput
              label="Mi nombre es"
              name="name"
              placeholder="Ej: Juan Perez"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full"
              error={errors.name || ""}
              disabled={disabled}
            />

            <SelectInput
              options={genderOptions}
              error={errors.gender}
              label="Género al nacer"
              name="gender"
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
              disabled={disabled}
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
              disabled={disabled}
            />

            {showAge && (
              <NumberInput
                label="Yo tengo"
                name="age"
                placeholder="Ej: 18"
                value={formData.age}
                onChange={(e) =>
                  handleInputChange("age", Number(e.target.value))
                }
                className="w-full"
                min={18}
                max={100}
                error={errors.age || ""}
                disabled={disabled}
              />
            )}
          </div>
        </div>

        {showPartner && (
          <div>
            <p className="text-[11px] sm:text-xs font-medium uppercase tracking-wide text-slate-500">
              Pareja
            </p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SelectInput
                options={genderOptions}
                error={errors.partnerGender}
                label="Género al nacer de mi pareja"
                name="partnerGender"
                value={formData.partnerGender}
                onValueChange={(value) =>
                  handleInputChange("partnerGender", value)
                }
                disabled={disabled}
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
                disabled={disabled}
              />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showChildren && (
          <motion.div
            key="children-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6 mt-6"
          >
            <div>
              <p className="text-[11px] sm:text-xs font-medium uppercase tracking-wide text-slate-500">
                Hijos
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <NumberInput
                  label="Número de hijos"
                  id="childrenCount"
                  name="childrenCount"
                  placeholder="Nº de hijos"
                  value={formData.childrenCount}
                  onChange={(e) =>
                    handleInputChange(
                      "childrenCount",
                      Number(e.target.value)
                    )
                  }
                  className="w-full"
                  min={1}
                  error={errors.childrenCount}
                  disabled={disabled}
                />
              </div>
            </div>

            <AnimatePresence>
              {formData.childrenCount && formData.childrenCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-4">
                    {formData.childrenCount === 1
                      ? "Datos de mi hijo"
                      : `Datos de mis ${formData.childrenCount} hijos`}
                  </label>
                  <div className="space-y-4">
                    {Array.from({ length: formData.childrenCount }).map(
                      (_, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50"
                        >
                          <NumberInput
                            label={`Edad hijo ${index + 1}`}
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
                            disabled={disabled}
                          />
                          <SelectInput
                            label={`Género hijo ${index + 1}`}
                            name={`childGender${index}`}
                            value={
                              formData.children?.[index]?.gender ?? ""
                            }
                            onValueChange={(value) =>
                              handleChildChange(index, "gender", value)
                            }
                            options={genderOptions}
                            error={errors[`children.${index}.gender`]}
                            disabled={disabled}
                          />
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {showOthers && (
          <motion.div
            key="others-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6 mt-6"
          >
            <div>
              <p className="text-[11px] sm:text-xs font-medium uppercase tracking-wide text-slate-500">
                Otras personas
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <NumberInput
                  label="¿Cuántas personas quieres asegurar?"
                  id="protectedCount"
                  name="protectedCount"
                  placeholder="Nº de personas"
                  value={formData.protectedCount}
                  onChange={(e) =>
                    handleInputChange(
                      "protectedCount",
                      Number(e.target.value)
                    )
                  }
                  error={errors.protectedCount}
                  className="w-full"
                  min={1}
                  disabled={disabled}
                />
              </div>
            </div>

            <AnimatePresence>
              {formData.protectedCount && formData.protectedCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  {Array.from({ length: formData.protectedCount }).map(
                    (_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50"
                      >
                        <TextInput
                          id={`protectedRelationship${index}`}
                          name={`protectedRelationship${index}`}
                          placeholder="Ej: Hermano"
                          value={
                            formData.protectedPersons?.[index]
                              ?.relationship || ""
                          }
                          onChange={(e) =>
                            handleProtectedPersonChange(
                              index,
                              "relationship",
                              e.target.value
                            )
                          }
                          error={
                            errors[
                              `protectedPersons.${index}.relationship`
                            ]
                          }
                          className="w-full"
                          label="Parentesco"
                          disabled={disabled}
                        />
                        <NumberInput
                          label="Edad"
                          id={`protectedAge${index}`}
                          name={`protectedAge${index}`}
                          placeholder="Edad"
                          value={
                            formData.protectedPersons?.[index]?.age || 0
                          }
                          onChange={(e) =>
                            handleProtectedPersonChange(
                              index,
                              "age",
                              Number(e.target.value)
                            )
                          }
                          error={
                            errors[`protectedPersons.${index}.age`]
                          }
                          className="w-full"
                          min={0}
                          disabled={disabled}
                        />
                        <SelectInput
                          label="Género"
                          name={`protectedGender${index}`}
                          value={
                            formData.protectedPersons?.[index]?.gender || ""
                          }
                          onValueChange={(value) =>
                            handleProtectedPersonChange(
                              index,
                              "gender",
                              value
                            )
                          }
                          error={
                            errors[`protectedPersons.${index}.gender`]
                          }
                          options={genderOptions}
                          disabled={disabled}
                        />
                      </motion.div>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {showParents && (
          <motion.div
            key="parents-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-3 mt-6"
          >
            <p className="text-[11px] sm:text-xs font-medium uppercase tracking-wide text-slate-500">
              Padres
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TextInput
                type="text"
                label="Nombre de papá"
                name="dadName"
                placeholder="Ej: Juan Pérez"
                value={formData.dadName}
                onChange={(e) => handleInputChange("dadName", e.target.value)}
                error={errors.dadName}
                className="w-full"
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
