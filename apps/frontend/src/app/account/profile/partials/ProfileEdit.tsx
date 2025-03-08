import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/shared/ui/input";
import { Formik, Form, FieldArray, Field } from "formik";
import {
  FilePenLineIcon,
  LoaderIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { BottomSheet, Image } from "@/shared/components";
import { getBase64 } from "@/shared/pipes";

type Props = {
  details?: {
    first_name: string;
    last_name: string;
    designation: string;
    skills: string[];
    total_experience: number;
    dateOfJoining: string;
    about: string;
    linkedin_username: string;
    avatar: string;
  };
};

export default function ProfileEdit({ details }: Props) {
  const bottomSheetRef = useRef<any>(null);
  const [fields, setFields] = useState<any>({
    image: "",
    first_name: "",
    last_name: "",
    linkedin_username: "",
    total_experience: 0,
    about: "",
    skills: [],
  });

  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("first_name", values?.first_name);
      formData.append("last_name", values?.last_name);
      formData.append("linkedin_username", values?.linkedin_username);
      formData.append("total_experience", values?.total_experience);
      formData.append("about", values?.about);
      if (values?.skills?.length) {
        values?.skills.forEach((skill: string) => {
          formData.append("skills[]", skill);
        });
      }
      if (values?.image)
        formData.append("avatar", await getBase64(values?.image));

      console.log(Object.fromEntries(formData));

      bottomSheetRef.current?.setToggle(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (details) {
      setFields(details);
    }
    return () => {};
  }, [details]);

  return (
    <div>
      <button
        type="button"
        onClick={() => bottomSheetRef.current?.setToggle(true)}
      >
        <FilePenLineIcon size={20} />
      </button>
      <BottomSheet ref={bottomSheetRef} heading="Edit Profile" className="px-4" scrollable>
        <Formik enableReinitialize initialValues={fields} onSubmit={onSubmit}>
          {(formik) => (
            <Form className="grid grid-cols-12 gap-6 mt-3 text-gray-800 p-2">
              <div className="col-span-12 flex justify-center pb-2">
                <div className="relative inline-block">
                  <Image //
                    src={
                      (formik?.values?.image &&
                        URL.createObjectURL(formik?.values?.image as any)) ||
                      formik?.values.avatar ||
                      "/images/person-placeholder.png"
                    }
                    alt="upload"
                    className="rounded-full w-[100px] h-[100px] object-contain bg-gray-400 border"
                    width={100}
                    height={100}
                  />
                  <label
                    role="button"
                    htmlFor="image"
                    className="p-2 bg-green-600 text-gray-100 rounded-full absolute bottom-[-8px] right-[-8px]"
                  >
                    <input //
                      type="file"
                      id="image"
                      onChange={(e: any) => {
                        formik.setFieldValue("image", e.target?.files[0]);
                      }}
                      hidden
                    />
                    <UploadIcon size={15} />
                  </label>
                </div>
              </div>
              <div className="col-span-6">
                <Field //
                  as={Input}
                  type="text"
                  name="first_name"
                  className="h-10"
                  label="name*"
                />
              </div>
              <div className="col-span-6">
                <Field //
                  as={Input}
                  type="text"
                  name="last_name"
                  className="h-10"
                  label="last name*"
                />
              </div>
              <div className="col-span-12">
                <Field //
                  as={Input}
                  name="linkedin_username"
                  type="text"
                  className="h-10"
                  label="linkedin username*"
                />
              </div>
              <div className="col-span-12 grid grid-cols-12">
                <FieldArray
                  name="skills"
                  render={(arrayHelpers) => (
                    <React.Fragment>
                      <div className="col-span-12 grid grid-cols-12 mb-2 items-center">
                        <div className="col-span-8">skills*</div>
                        <div className="col-span-4 text-end">
                          <button
                            className="bg-green-600 py-1 px-3 text-xs text-gray-100"
                            type="button"
                            onClick={() => arrayHelpers.push("")}
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                      {formik.values?.skills?.map((_: any, idx: number) => (
                        <div
                          key={`profile-skill-${idx}`}
                          className="col-span-4 flex items-center gap-2 mb-2"
                        >
                          <Field //
                            as={Input}
                            name={`skills.${idx}`}
                            type="text"
                            className="h-10"
                          />
                          <button
                            type="button"
                            className="text-red-600"
                            onClick={() => arrayHelpers.remove(idx)}
                          >
                            <Trash2Icon size={20} />
                          </button>
                        </div>
                      ))}
                    </React.Fragment>
                  )}
                />
              </div>
              <div className="col-span-6">
                <Field //
                  as={Input}
                  name="total_experience"
                  type="text"
                  className="h-10"
                  label="work experience*"
                />
              </div>
              <div className="col-span-12">
                <Field //
                  as={Textarea}
                  name="about"
                  label="about"
                  id="about"
                  rows={4}
                  className="border w-full rounded-sm p-2"
                />
              </div>
              <div className="col-span-12 ">
                <div className="flex gap-3 justify-end">
                  <Button
                    size="sm"
                    variant="destructive"
                    type="button"
                    onClick={() => bottomSheetRef.current?.setToggle(false)}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" type="submit">
                    {true ? <LoaderIcon size={16} className="spin" /> : ""}{" "}
                    Update
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </BottomSheet>
    </div>
  );
}
