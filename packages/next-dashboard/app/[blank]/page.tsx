import AlertInfo from "@/components/alert/info";
import Container from "@/components/page/container";

export default function Home() {
  return (
    <Container className="sm:flex sm:items-start">
      <AlertInfo
        title={"Oops!"}
        content={"Looks like our developers are still cooking this up. Stay tuned!"}/>
    </Container>
  );
}
