import { useRouteError } from "react-router-dom";

type ErrorResponse = {
  data: string;
  status: number;
  statusText: string;
};

function ErrorPage() {
  const error = useRouteError() as ErrorResponse;

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        <i>
          {error.status} {error.statusText}
        </i>
      </p>
      <p>
        <i>{error.data}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
