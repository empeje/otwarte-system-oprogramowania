import Container from "@/components/page/container";
import AlertInfo from "@/components/alert/info";

export default function NotFound() {
  return (
    <div>
      <Container className="sm:flex sm:items-start">
        {/*@ts-expect-error expect error after issue with react upgrade*/}
        <AlertInfo
          title={"Oops!"}
          content={"Page not found!"}/>
      </Container>
    </div>
  )
}