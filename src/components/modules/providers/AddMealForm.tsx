"use client";
import {
  createMealProvider,
  generateMealDescriptionProvider,
} from "@/actions/getProviders";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { defaultValues, mealFormSchema } from "@/schema/mealSchema";
import { useForm } from "@tanstack/react-form";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

interface AddMealFormProps extends React.ComponentProps<"div"> {
  categories?: Array<{ id: string; name: string }>;
}

export default function AddMealForm({
  className,
  categories,
  ...props
}: AddMealFormProps) {
  const router = useRouter();
  const [isGeneratingDescription, setIsGeneratingDescription] =
    React.useState(false);
  const form = useForm({
    defaultValues: defaultValues,
    validators: { onSubmit: mealFormSchema },
    onSubmit: async ({ value }: { value: typeof defaultValues }) => {
      const toastId = toast.loading("Creating your meal...");
      try {
        const payload = {
          name: value.name,
          cuisine: value.cuisine,
          dietary: value.dietary,
          price: value.price,
          calories: value.calories,
          ingredients: value.ingredients,
          description: value.description,
          image: value.image || undefined,
          isAvailable: value.isAvailable,
          mealType: value.mealType,
          spiceLevel: value.spiceLevel,
          categoryId: value.categoryId,
        };

        const res = await createMealProvider(payload);
        if (res?.data?.success) {
          toast.success(res.data?.message || "Meal created successfully", {
            id: toastId,
          });
          router.push("/provider-dashboard/meals");
        } else {
          toast.error(res?.message || "Failed to create meal", {
            id: toastId,
          });
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.", {
          id: toastId,
        });
      }
    },
  });

  const handleGenerateDescription = async () => {
    const title = (form.getFieldValue("name") || "").trim();
    const cuisine = (form.getFieldValue("cuisine") || "").trim();
    const mealType = (form.getFieldValue("mealType") || "").trim();
    const category = cuisine || mealType;

    if (!title) {
      toast.error("Please enter meal title first");
      return;
    }

    if (!category) {
      toast.error("Please enter cuisine or meal type first");
      return;
    }

    setIsGeneratingDescription(true);
    const toastId = toast.loading("Generating AI description...");

    try {
      const res = await generateMealDescriptionProvider(title, category);

      if (!res?.status || !res?.data?.success) {
        toast.error(res?.message || "Failed to generate description", {
          id: toastId,
        });
        return;
      }

      const generatedDescription =
        res?.data?.data?.generatedDescription ||
        res?.data?.data?.meal?.description ||
        "";

      if (!generatedDescription) {
        toast.error("No description generated", { id: toastId });
        return;
      }

      form.setFieldValue("description", generatedDescription);
      toast.success("Description generated successfully", { id: toastId });
    } catch {
      toast.error("Failed to generate description", { id: toastId });
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className=" bg-amber-950/10 shadow-sm rounded-md">
          <form
            className="p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="name"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value ?? ""}
                          placeholder="Enter title"
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="cuisine"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Cuisine</FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value ?? ""}
                          placeholder="Enter cuisine"
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="dietary"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Dietary</FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={
                            Array.isArray(field.state.value)
                              ? field.state.value.join(", ")
                              : ""
                          }
                          placeholder="Enter dietary information (comma-separated)"
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value.split(",").map((s) => s.trim()),
                            )
                          }
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="ingredients"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Ingredients
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={
                            Array.isArray(field.state.value)
                              ? field.state.value.join(", ")
                              : ""
                          }
                          placeholder="Enter ingredients (comma-separated)"
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value.split(",").map((s) => s.trim()),
                            )
                          }
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="price"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                        <Input
                          type="number"
                          id={field.name}
                          name={field.name}
                          min="0"
                          value={field.state.value ?? ""}
                          placeholder="Enter price"
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="calories"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Calories</FieldLabel>
                        <Input
                          type="number"
                          id={field.name}
                          name={field.name}
                          min="0"
                          value={field.state.value ?? ""}
                          placeholder="Enter calories"
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="mealType"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Meal Type</FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value ?? ""}
                          placeholder="Enter meal type"
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="spiceLevel"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Spice Level
                        </FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value ?? ""}
                          placeholder="Enter spice level (Low, Medium, High)"
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value as "Low" | "Medium" | "High",
                            )
                          }
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="image"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                        <Input
                          type="url"
                          id={field.name}
                          name={field.name}
                          value={field.state.value ?? ""}
                          placeholder="Enter image URL"
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="categoryId"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Select Category
                        </FieldLabel>
                        <Select
                          onValueChange={(value) => field.handleChange(value)}
                          value={field.state.value || ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {categories?.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
              <form.Field
                name="description"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="col-span-1 md:col-span-2">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <FieldLabel htmlFor={field.name}>
                          Description
                        </FieldLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleGenerateDescription}
                          disabled={isGeneratingDescription}
                          className="gap-1.5"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          {isGeneratingDescription
                            ? "Generating..."
                            : "Generate with AI"}
                        </Button>
                      </div>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        placeholder="Enter description"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <Button type="submit" className="w-full">
                Create Meal
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
