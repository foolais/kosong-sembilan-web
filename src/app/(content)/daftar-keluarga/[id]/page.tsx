import { Suspense } from "react";
import FormFamily from "@/components/form/form-family";
import { Loader } from "lucide-react";

type IProps = {
  params: Promise<{ id: string }>;
};

const DetailKeluargaPage = async ({ params }: IProps) => {
  const { id } = await params;

  return (
    <div>
      <Suspense fallback={<Loader className="animate-spin size-8" />}>
        <FormFamily mode="UPDATE" familyId={id} />
      </Suspense>
    </div>
  );
};

export default DetailKeluargaPage;
