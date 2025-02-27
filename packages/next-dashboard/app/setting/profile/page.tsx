'use client';

import {Icons} from "@/components/icons/icons";
import Image from "next/image";
import InputText from "@/components/forms/input-text";
import Button from "@/components/button/button";
import SettingTab from "@/components/complex/setting/setting-tab";
import {FormEvent, useState} from "react";
import ModalDialog from "@/components/alert/modal-dialog";

export default function ProfilePage() {
  const forms = [
    {name: 'name', label: 'Your Name', placeholder: 'Charlene Reed', type: 'text'},
    {name: 'username', label: 'User Name', placeholder: 'Charlene Reed', type: 'text'},
    {name: 'email', label: 'Email', placeholder: 'charlenereed@gmail.com', type: 'email'},
    {name: 'password', label: 'Password', placeholder: 'Password', type: 'password'},
    {name: 'data_of_birth', label: 'Date of Birth', placeholder: 'Date of Birth', type: 'date'},
    {name: 'present_address', label: 'Present Address', placeholder: 'San Jose, California, USA', type: 'text'},
    {name: 'permanent_address', label: 'Permanent Address', placeholder: 'San Jose, California, USA', type: 'text'},
    {name: 'city', label: 'City', placeholder: 'San Jose', type: 'text'},
    {name: 'postal_code', label: 'Postal Code', placeholder: '45962', type: 'number'},
    {name: 'country', label: 'Country', placeholder: 'USA', type: 'text'},
  ]

  const [open, setOpen] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(true);
    e.currentTarget.reset();
  }

  const setClose = () => {
    setOpen(false)
  }


  return (
    <SettingTab>
      <ModalDialog
        open={open}
        setOpen={() => {
          setClose()
        }}
        title={"Thank You!"}
        content={"Send success"}
      />
      <form
        onSubmit={onSubmit}
        className="sm:space-x-[65px] sm:pl-[30px] pt-[45px] sm:pt-[40px] flex flex-col items-center sm:items-start sm:flex-row flex-wrap">
        <div className={"size-[100px] sm:size-[90px] relative flex-shrink-0"}>
          <Image
            src={"/people/woman.png"} alt={"Profile image edit"} width={90} height={90}
            className={"size-[100px] sm:size-[90px] rounded-full"}/>

          <div
            className={"size-[30px] absolute -bottom-[1px] -right-[8px] rounded-full bg-[#232323] flex items-center justify-center"}>
            <Icons.Pencil/>
          </div>
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

