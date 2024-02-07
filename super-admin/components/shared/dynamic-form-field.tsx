"use client";

import { useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PlusCircle, Trash2 } from "lucide-react";

type DynamicFormFieldProps = {
  form: any;
  name: string;
  label: string;
};

const DynamicFormField = ({ form, name, label }: DynamicFormFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control: form.control,
    rules: {
      required: `Please add at least 1 ${name}`,
    },
  });
  return (
    <div className="flex flex-col gap-2 mt-2">
      <p className="font-medium capitalize">{name}</p>

      {fields.length > 0 &&
        fields.map((field, index) => (
          <div key={field.id}>
            <div className="w-full">
              <Label className="text-sm opacity-85">
                {label} {index + 1}
              </Label>

              <div className="flex items-center w-full mt-2">
                <Input
                  className="w-full"
                  required
                  {...form.register(`${name}.${index}.name`)}
                />

                {index > 0 && (
                  <Button
                    onClick={() => remove(index)}
                    type="button"
                    size="sm"
                    className="ml-4"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

      <Button
        onClick={() =>
          append({
            name: "",
          })
        }
        type="button"
        className="w-full"
        variant="secondary"
      >
        <PlusCircle className="w-4 h-4 mr-2" />

        <p>Add {name}</p>
      </Button>
    </div>
  );
};

export default DynamicFormField;
