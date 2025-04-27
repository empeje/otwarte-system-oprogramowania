import SettingTab from "@/components/complex/setting/setting-tab";
import Container from "@/components/page/container";
import AlertInfo from "@/components/alert/info";

export default function SecurityPage() {
  return (
    <SettingTab>
      <Container className="sm:flex sm:items-start">
        <AlertInfo
          title={"You found a hidden door!"}
          content={"Unfortunately, it's still locked. We're working on the key!"}/>
      </Container>
    </SettingTab>
  )
}