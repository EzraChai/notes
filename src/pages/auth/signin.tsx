import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { Button } from "~/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { authOptions } from "~/server/auth";

export default function SignIn({
  providers,
  errors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (errors === "Callback") {
    errors = "请您授权权限。";
  }
  if (errors === "OAuthAccountNotLinked") {
    errors = "请您使用其他供应商。";
  }

  return (
    <div className=" mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4">
      {errors && (
        <Alert
          className="w-[220px] bg-destructive text-destructive-foreground"
          variant="destructive"
        >
          <AlertTitle className="font-semibold text-primary">错误</AlertTitle>
          <AlertDescription className=" text-secondary-foreground">
            {errors}
          </AlertDescription>
        </Alert>
      )}
      <Card className="w-[220px]">
        <CardHeader>
          <CardTitle>登录</CardTitle>
          <CardDescription>登录您的帐号。</CardDescription>
        </CardHeader>
        <CardContent
          className={"flex flex-col items-center justify-center gap-2"}
        >
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button variant={"outline"} onClick={() => signIn(provider.id)}>
                使用 {provider.name} 登录
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!

  if (session) {
    return { redirect: { destination: "/" } };
  }

  let errors: string | string[] = "";
  if (context.query.error) {
    errors = context.query.error;
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [], errors: errors },
  };
}
