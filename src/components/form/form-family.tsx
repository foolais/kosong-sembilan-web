"use client";

import {
  familySchema,
  IFamilyFormValues,
} from "@/features/family/family.schema";
import { IFamilyData } from "@/models/Family";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { FileText, Send, User, Users, XIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { useCreateFamily } from "@/features/family/family.hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type IProps = {
  mode: "CREATE" | "UPDATE";
  initialData?: IFamilyData;
};
const FormFamily = ({ mode }: IProps) => {
  const familyMutation = useCreateFamily();
  const router = useRouter();
  const isCreate = mode === "CREATE";

  const form = useForm<IFamilyFormValues>({
    resolver: zodResolver(familySchema),
    defaultValues: {
      headFamily: "",
      status: "resident",
      members: [
        {
          name: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  });

  const onSubmit = (data: IFamilyFormValues) => {
    if (isCreate) {
      familyMutation.mutate(data, {
        onSuccess: (response) => {
          toast.success(response.message);
          router.replace("/daftar-keluarga");
        },
        onError: (error) => {
          console.error(error);
          toast.error(error.message || "Terjadi kesalahan");
        },
      });

      return;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-1 flex items-center justify-center gap-1">
        <FileText />
        {isCreate ? "Pendataan Keluarga Baru" : "Perbarui Data Keluarga"}
      </h2>
      <p className="text-sm text-muted-foreground text-center">
        {isCreate
          ? "Lengkapi data kepala keluarga dan anggota keluarga untuk didaftarkan ke dalam sistem."
          : "Sesuaikan data kepala keluarga dan anggota keluarga agar tetap akurat dan terkini."}
      </p>
      <div className="border-b-2 border-primary my-4" />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-4">
          <Controller
            name="headFamily"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Kepala Keluarga</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <User className="text-primary" />
                  </InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    placeholder="Kepala Keluarga"
                    aria-invalid={fieldState.invalid}
                    autoComplete="headFamily"
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Tempat Tinggal</FieldLabel>
                <Tabs
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue="resident"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="resident">Rumah</TabsTrigger>
                    <TabsTrigger value="boarding">Kos</TabsTrigger>
                  </TabsList>
                </Tabs>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <FieldSet>
            <FieldLabel>Daftar Anggota Keluarga</FieldLabel>
            <FieldGroup>
              {fields.map((field, index) => (
                <Controller
                  key={field.id}
                  name={`members.${index}.name`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <InputGroup>
                          <InputGroupAddon align="inline-start">
                            <Users />
                          </InputGroupAddon>
                          <InputGroupInput
                            {...controllerField}
                            id={`form-rhf-array-member-${index}`}
                            aria-invalid={fieldState.invalid}
                            placeholder={"Anggota Keluarga " + (index + 1)}
                            autoComplete={`members.${index}.name`}
                          />
                          <InputGroupAddon align="inline-end">
                            {fields.length !== 1 && (
                              <InputGroupButton
                                type="button"
                                size="icon-xs"
                                onClick={() => remove(index)}
                                aria-label={`Remove name ${index + 1}`}
                              >
                                <XIcon />
                              </InputGroupButton>
                            )}
                          </InputGroupAddon>
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>
          </FieldSet>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ name: "" })}
            className="cursor-pointer"
          >
            Tambah Anggota Keluarga
          </Button>
        </div>
        <div className="border-b-2 border-primary my-4" />
        <Button
          variant="secondary"
          type="submit"
          className="w-full cursor-pointer flex items-center justify-center font-semibold tracking-wide mt-2"
        >
          {mode === "CREATE" ? "Tambahkan" : "Ubah"} Data <Send />
        </Button>
      </form>
    </div>
  );
};

export default FormFamily;
