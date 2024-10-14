import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";

const SpeakerFieldArray = () => {
  const { control, register, formState } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "speakers", // This should match the name in the schema
  });

  return (
    <div>
      {fields.map((speaker, index) => (
        <div key={speaker.id} className="p-2 border rounded mb-4">
          <FormField
            name={`speakers.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Speaker Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription>Enter the speaker name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name={`speakers.${index}.bio`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Speaker Bio</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription>Enter the speaker bio.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name={`speakers.${index}.image`}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <FormItem className="flex flex-col max-w-64">
                  <FormLabel>Speaker Image</FormLabel>
                  <FormControl>
                    <Button size="lg" type="button">
                      <input
                        type="file"
                        id="fileInput"
                        className="text-white"
                        onBlur={field.onBlur}
                        name={field.name}
                        onChange={(e) => field.onChange(e.target.files)}
                        ref={field.ref}
                      />
                    </Button>
                  </FormControl>
                  <FormDescription>2mb max, PNG, JPG, JPEG, WEBP</FormDescription>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          <Button type="button" onClick={() => remove(index)}>
            Remove Speaker
          </Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={() =>
          append({
            name: "",
            bio: "",
            image: "", // Empty fields for new speaker
          })
        }
      >
        Add Speaker
      </Button>
    </div>
  );
};

export default SpeakerFieldArray;
