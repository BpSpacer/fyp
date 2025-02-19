"use client";

import { createSeller } from "@/app/selleractions"
import { SubmitButton } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { sellerControl } from "@/app/lib/zodsellerSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function ManageSeller() {
  const [image, setImages] = useState<string | undefined>(undefined);
  const [lastResult, action] = useFormState(createSeller, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: sellerControl });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Seller</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Seller Details</CardTitle>
          <CardDescription>Create New Seller right here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>First Name</Label>
              <Input
                name={fields.firstName.name}
                key={fields.id.key}
                defaultValue={fields.id.initialValue}
                type="text"
                placeholder="Seller First Name"
              />
              <p className="text-red-500">{fields.id.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Last Name</Label>
              <Input
                name={fields.lastName.name}
                key={fields.id.key}
                defaultValue={fields.id.initialValue}
                type="text"
                placeholder="Seller Last Name"
              />
              <p className="text-red-500">{fields.id.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Email</Label>
              <Input
                name={fields.email.name}
                key={fields.email.key}
                defaultValue={fields.email.initialValue}
                type="email"
                placeholder="Seller Email"
              />
              <p className="text-red-500">{fields.email.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Stripe Connected Account ID</Label>
              <Input
                name={fields.connectedAccountId.name}
                key={fields.connectedAccountId.key}
                defaultValue={fields.connectedAccountId.initialValue}
                type="text"
                placeholder="Stripe Connected Account ID"
              />
              <p className="text-red-500">{fields.connectedAccountId.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Stripe Connected Account Link</Label>
              <Input
                name={fields.stripeConnectedLinked.name}
                key={fields.stripeConnectedLinked.key}
                defaultValue={fields.stripeConnectedLinked.initialValue}
                type="text"
                placeholder="Stripe Connected Account Link"
              />
              <p className="text-red-500">{fields.stripeConnectedLinked.errors}</p>
            </div>
            
            


            <div className="flex flex-col gap-3">
              <Label>Image</Label>
              <input
                type="hidden"
                value={image}
                key={fields.profileImage.key}
                name={fields.profileImage.name}
                defaultValue={fields.profileImage.initialValue}
              />
              {image !== undefined ? (
                <Image
                  src={image}
                  alt="Product Image"
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px] object-cover border rounded-lg"
                />
              ) : (
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    setImages(res[0].url);
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                  endpoint="bannerImageRoute"
                />
              )}

              <p className="text-red-500">{fields.profileImage.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Edit Seller" />
        </CardFooter>
      </Card>
    </form>
  );
}