'use client';

import {Icons} from "@/components/icons/icons";
import Image from "next/image";
import InputText from "@/components/forms/input-text";
import Button from "@/components/button/button";
import SettingTab from "@/components/complex/setting/setting-tab";
import {FormEvent, useEffect, useRef, useState} from "react";
import ModalDialog from "@/components/alert/modal-dialog";
import {SettingsService} from "@/utils/api/settings";
import {UserSettings} from "@/types/setting";
import {dbToInputDate} from "@/utils/helper";

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [setting, setSetting] = useState<UserSettings>();

  const forms = [
    {defaultValue: setting?.profile?.name, name: 'name', label: 'Your Name', placeholder: '', type: 'text'},
    {
      defaultValue: setting?.profile?.name.toLowerCase().replace(" ", ""),
      name: 'username',
      label: 'User Name',
      placeholder: 'Charlene Reed',
      type: 'text'
    },
    {
      defaultValue: setting?.profile?.email,
      name: 'email',
      label: 'Email',
      placeholder: 'example@gmail.com',
      type: 'email'
    },
    {defaultValue: 'password', name: 'password', label: 'Password', placeholder: 'Password', type: 'password'},
    {
      defaultValue: dbToInputDate((new Date).toISOString()),
      name: 'data_of_birth',
      label: 'Date of Birth',
      placeholder: 'Date of Birth',
      type: 'date'
    },
    {
      defaultValue: '',
      name: 'present_address',
      label: 'Present Address',
      placeholder: 'San Jose, California, USA',
      type: 'text'
    },
    {
      defaultValue: '',
      name: 'permanent_address',
      label: 'Permanent Address',
      placeholder: 'San Jose, California, USA',
      type: 'text'
    },
    {defaultValue: '', name: 'city', label: 'City', placeholder: 'San Jose', type: 'text'},
    {defaultValue: '', name: 'postal_code', label: 'Postal Code', placeholder: '45962', type: 'number'},
    {defaultValue: '', name: 'country', label: 'Country', placeholder: 'USA', type: 'text'},
  ]

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(true);
    e.currentTarget.reset();
  }

  const inputFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    SettingsService.getSettings().then(data => {
      console.log(data);
      setSetting(data);
    })
  }, []);

  return (
    <SettingTab>
      <ModalDialog
        open={open}
        setOpen={() => {
          setOpen(false)
        }}
        title={"Thank You!"}
        content={"Update Profile Successfully"}
      />
      <form
        onSubmit={onSubmit}
        className="sm:space-x-[65px] sm:pl-[30px] pt-[45px] sm:pt-[40px] flex flex-col items-center sm:items-start sm:flex-row flex-wrap">
        <div className={"size-[100px] sm:size-[90px] relative flex-shrink-0"}>
          {setting?.profile?.avatar && <Image
              src={setting?.profile?.avatar} alt={setting?.profile.name} width={90} height={90}
              className={"size-[100px] sm:size-[90px] rounded-full"}/>}
          <InputText
            ref={inputFile}
            label={"Upload Image"} type={"file"} className={"hidden"}/>
          <button
            type="button"
            onClick={() => {
              inputFile.current?.click();
            }}
            className={"size-[30px] absolute -bottom-[1px] -right-[8px] rounded-full bg-[#232323] flex items-center justify-center"}>
            <Icons.Pencil/>
          </button>
        </div>

        {/*Form*/}
        <div className={"grid sm:grid-cols-2 gap-x-[30px] gap-y-[22px] flex-1 w-full mt-[22px] sm:mt-0"}>
          {forms.map((form) => (
            <InputText {...form} key={form.name}/>
          ))}
        </div>

        <div className={"flex-1 basis-full w-full text-right mt-[16px] sm:mt-[40px]"}>
          <Button type={"submit"} className={"ml-auto w-full sm:w-fit"}/>
        </div>
      </form>

    </SettingTab>

  )
}

