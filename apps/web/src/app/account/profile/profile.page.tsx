import React, { useEffect, useState } from "react";
import { Input } from "@/shared/ui/input";
import { Formik, Form, FieldArray, Field } from "formik";
import { LoaderCircleIcon, LogOutIcon, Trash2Icon, UploadIcon } from "lucide-react";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import {  Image } from "@/shared/components";
import { getBase64 } from "@/shared/pipes";
import { useAppDispatch, useAppSelector } from "@/api/store";
import useLogoutPage from "@/app/auth/logout/logout.page";
import { authService } from "@/api/services/auth.service";
import { Card } from "@/shared/ui/card";
import { useNavigate } from "react-router";

export default function ProfilePage({ createProfile }: { createProfile?: boolean }) {
   const { session } = useAppSelector((state) => state.authReducer);
   const logout = useLogoutPage();
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
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
         if (values?.image) formData.append("avatar", await getBase64(values?.image));
         console.log(Object.fromEntries(formData));

         await dispatch(authService.updateProfile.api(formData)).unwrap();
         navigate("/", { replace: true });
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (session.data?.profile) {
         const { dateOfJoining, ...profile } = session.data?.profile;
         setFields(profile);
      }
      return () => {};
   }, [session.data?.profile]);

   return (
      <>
         <div className="p-[15px] bg-white ">
            <Formik enableReinitialize initialValues={fields} onSubmit={onSubmit}>
               {(formik) => (
                  <Form>
                     <Card className="grid grid-cols-12 gap-2 p-[15px]">
                        <div className="col-span-12 flex pb-2">
                           <div className="relative inline-block">
                              <Image //
                                 src={(formik?.values?.image && URL.createObjectURL(formik?.values?.image as any)) || formik?.values.avatar || "/images/person-placeholder.png"}
                                 alt="upload"
                                 className="rounded-full w-[100px] h-[100px] object-contain bg-gray-400 border"
                                 width={100}
                                 height={100}
                              />
                              <label role="button" htmlFor="image" className="p-2 bg-green-600 text-gray-100 rounded-full absolute bottom-[-8px] right-[-8px]">
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
                        <div className="col-span-6">
                           <Field //
                              as={Input}
                              name="linkedin_username"
                              type="text"
                              className="h-10"
                              label="linkedin username*"
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
                     </Card>
                     <Card className="grid grid-cols-12 gap-2 p-[15px] my-3">
                        <FieldArray
                           name="skills"
                           render={(arrayHelpers) => (
                              <React.Fragment>
                                 <div className="col-span-12 grid grid-cols-12 mb-2 items-center">
                                    <div className="col-span-8">
                                       <span className="mb-2 block text-sm font-medium">skills</span>
                                    </div>
                                    <div className="col-span-4 text-end">
                                       <button className="bg-green-600 py-1 px-3 text-xs text-gray-100" type="button" onClick={() => arrayHelpers.push("")}>
                                          + Add
                                       </button>
                                    </div>
                                 </div>
                                 {formik.values?.skills?.map((_: any, idx: number) => (
                                    <div key={`profile-skill-${idx}`} className="col-span-6 md:col-span-4 flex items-center gap-2 mb-2">
                                       <Field //
                                          as={Input}
                                          name={`skills.${idx}`}
                                          type="text"
                                          className="h-10"
                                       />
                                       <button type="button" className="text-red-600 mx-2" onClick={() => arrayHelpers.remove(idx)}>
                                          <Trash2Icon size={20} />
                                       </button>
                                    </div>
                                 ))}
                              </React.Fragment>
                           )}
                        />
                     </Card>
                     <div className="col-span-12">
                        {createProfile ? (
                           <div className="flex justify-end gap-1 mt-4">
                              <Button size="sm" type="submit" disabled={session?.isUpdating}>
                                 Create Profile {session?.isUpdating ? <LoaderCircleIcon className="spin" /> : ""}
                              </Button>
                              <Button size="sm" type="button" variant="destructive" disabled={session?.isUpdating} onClick={logout.function}>
                                 {logout.loading ? <LoaderCircleIcon size={20} className="spin" /> : <LogOutIcon size={20} />}
                                 Logout
                              </Button>
                           </div>
                        ) : (
                           <Button type="submit" variant="theme" className="w-full md:w-auto" disabled={session?.isUpdating}>
                              Update Profile {session?.isUpdating ? <LoaderCircleIcon className="spin" /> : ""}
                           </Button>
                        )}
                     </div>
                  </Form>
               )}
            </Formik>
         </div>
      </>
   );
}
