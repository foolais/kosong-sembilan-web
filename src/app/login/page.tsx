import FormLogin from "@/components/form/form-login";
import { Title } from "@/components/title";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className="w-svw h-svh flex flex-col items-center justify-center gap-6">
      <Title size="xl" />
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-center font-semibold tracking-wide">
            Selamat Datang
          </CardTitle>
          <CardDescription className="text-center">
            Silakan masuk menggunakan akun yang telah terdaftar untuk mengakses
            dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormLogin />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
