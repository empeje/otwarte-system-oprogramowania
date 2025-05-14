import SettingTab from "@/components/complex/setting/setting-tab";
import Container from "@/components/page/container";
import AlertInfo from "@/components/alert/info";

export default function PreferencePage() {
  return (
    <SettingTab>
      <Container className="sm:flex sm:items-start">
        {/*@ts-expect-error expect error after issue with react upgrade*/}
        <AlertInfo
          title={"Oops!"}
          content={"Looks like our developers are still cooking this up. Stay tuned!"}/>
      </Container>
    </SettingTab>
  )
}