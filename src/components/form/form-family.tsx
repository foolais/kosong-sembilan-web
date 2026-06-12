"use client";

import {
  familySchema,
  IFamilyFormValues,
} from "@/features/family/family.schema";
import { IFamilyMember } from "@/models/Family";
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
import {
  FileText,
  Loader,
  Send,
  Trash,
  User,
  Users,
  XIcon,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  useCreateFamily,
  useDeleteFamily,
  useFamily,
  useUpdateFamily,
} from "@/features/family/family.hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import BackButton from "../button/back-button";

type IProps = {
  mode: "CREATE" | "UPDATE";
  familyId?: string;
};
const FormFamily = ({ mode, familyId }: IProps) => {
  const isCreate = mode === "CREATE";

  const { data: familyResponse, isLoading } = useFamily(familyId || "");

  const createMutation = useCreateFamily();
  const updateMutation = useUpdateFamily();
  const deleteMutation = useDeleteFamily();

  const router = useRouter();

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

  const {
    formState: { isDirty },
  } = form;
  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  });

  useEffect(() => {
    if (!isCreate && familyResponse?.data) {
      const { headFamily, status, members } = familyResponse.data;

      form.reset({
        headFamily,
        status,
        members: members.map((member: IFamilyMember) => ({
          name: member.name,
        })),
      });
    }
  }, [familyResponse, form, isCreate]);

  const onSubmit = (data: IFamilyFormValues) => {
    if (isCreate) {
      createMutation.mutate(data, {
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
    } else if (!isCreate && !isDirty) {
      toast.info("Belum ada perubahan data");
      return;
    } else {
      updateMutation.mutate(
        {
          id: familyId!,
          payload: data,
        },
        {
          onSuccess: (response) => {
            toast.success(response.message);
            router.replace("/daftar-keluarga");
          },
          onError: (error) => {
            console.error(error);
            toast.error(error.message || "Terjadi kesalahan");
          },
        }
      );
    }
  };

  const onDeleteFamily = () => {
    deleteMutation.mutate(familyId!, {
      onSuccess: (response) => {
        toast.success(response.message);
        router.replace("/daftar-keluarga");
      },
      onError: (error) => {
        console.error(error);
        toast.error(error.message || "Terjadi kesalahan");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-md h-[50vh] flex items-center justify-center">
        <Loader className="animate-spin size-8" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {!isCreate && (
        <div className="flex items-center justify-between mb-4">
          <BackButton options={{ isSubmitting, isDeleting }} />
          <Button
            variant="destructive"
            className="h-8 p-2 cursor-pointer"
            onClick={onDeleteFamily}
          >
            <Trash />
          </Button>
        </div>
      )}
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
        <div
          className={cn(
            "overflow-y-auto pr-2 space-y-4",
            isCreate ? "max-h-[50vh]" : "max-h-[45vh] "
          )}
        >
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
                    <TabsTrigger
                      value="resident"
                      className="data-[state=active]:bg-primary"
                    >
                      Rumah
                    </TabsTrigger>
                    <TabsTrigger
                      value="boarding"
                      className="data-[state=active]:bg-secondary"
                    >
                      Kos
                    </TabsTrigger>
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
          disabled={(!isCreate && !isDirty) || isSubmitting || isDeleting}
          className="w-full cursor-pointer flex items-center justify-center font-semibold tracking-wide mt-2"
        >
          {isSubmitting ? (
            <>
              {isCreate ? "Menyimpan" : "Mengubah"} Data
              <Loader className="size-4 animate-spin" />
            </>
          ) : (
            <>
              {isCreate ? "Tambahkan" : "Ubah"} Data{" "}
              <Send className="size-4 mt-0.5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default FormFamily;
