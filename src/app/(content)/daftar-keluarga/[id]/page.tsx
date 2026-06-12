type IProps = {
  params: Promise<{ id: string }>;
};

const DetailKeluargaPage = async ({ params }: IProps) => {
  const { id } = await params;

  return <div>DetailKeluargaPage {id}</div>;
};

export default DetailKeluargaPage;
