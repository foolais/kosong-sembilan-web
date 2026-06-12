import FormFamily from "@/components/form/form-family";

type IProps = {
  params: Promise<{ id: string }>;
};

const DetailKeluargaPage = async ({ params }: IProps) => {
  const { id } = await params;

  return (
    <div>
      <FormFamily mode="UPDATE" familyId={id} />
    </div>
  );
};

export default DetailKeluargaPage;
