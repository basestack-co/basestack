// Navigation
import { useRouter } from "next/router";
import Head from "next/head";

const FormErrorSuccess = () => {
  const router = useRouter();
  const message = router.query.message as string;
  const goBackUrl = router.query.goBackUrl as string;

  return (
    <>
      <Head>
        <title>Basestack / Form Submission Error</title>
      </Head>
      <div>
        <h1>Error form submission</h1>
        <p>{message}</p>
        <a href={goBackUrl}>Go back</a>
      </div>
    </>
  );
};

export default FormErrorSuccess;
