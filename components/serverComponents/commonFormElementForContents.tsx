"use client";
import { adminActionProps } from "@/app/customTypes/types";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useActionState } from "react";
import { postContents } from "@/app/actions/postContents";
import { editContents } from "@/app/actions/editContents";
import { useFormTypeId } from "@/app/contexts/contentFormRelatedContext";
import { useState, useEffect } from "react";

const CommonFormElementForContents = ({
  contentTypes,
  techs,
  categories,
  close,
}: adminActionProps) => {
  const { contentForEditting, isAddingState, contentOfType } =
    useFormTypeId();

  const targetCrudForm = isAddingState? postContents: editContents;
  
  const [state, formAction, pending] = useActionState(targetCrudForm, {
    errors: {},
    success: false,
  });

  // Controlled state for Selects
  const [contentTypeId, setContentTypeId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [techId, setTechId] = useState("");

  // Initialize state when editing
  useEffect(() => {
    if (!isAddingState && contentForEditting?.[0]) {
      setContentTypeId(contentForEditting[0].content_type_id || "");
      setCategoryId(contentForEditting[0].category_id || "");
      setTechId(contentForEditting[0].tech_id || "");
    }
  }, [isAddingState, contentForEditting]);

  if (contentOfType === null) {
    return <p>Content type becomes null from context</p>;
  }

  return (
    <form action={formAction} className="overflow-y-auto max-h-[80vh]">
      {/* Hidden ID for editing */}
      {!isAddingState && (
        <input type="hidden" name="id" value={contentForEditting?.[0]?.id || ""} />
      )}

      {/* Title */}
      <Field>
        <FieldLabel htmlFor="title">
          {isAddingState
            ? `Enter the title of the ${contentOfType}`
            : `Edit the title of the ${contentOfType}`}
        </FieldLabel>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder={`${contentOfType} title`}
          className="border-3"
          defaultValue={isAddingState ? "" : contentForEditting?.[0]?.title || ""}
        />
        {state.errors?.title?.[0] && (
          <p className="text-red-500 text-[16px]">{state.errors.title[0]}</p>
        )}
      </Field>

      {/* Description */}
      <Field>
        <FieldLabel htmlFor="description">
          {isAddingState
            ? `Enter ${contentOfType} description`
            : `Edit ${contentOfType} description`}
        </FieldLabel>
        <Input
          id="description"
          name="description"
          type="text"
          placeholder={`Enter ${contentOfType} description`}
          className="border-3"
          defaultValue={isAddingState ? "" : contentForEditting?.[0]?.description || ""}
        />
        {state.errors?.description?.[0] && (
          <p className="text-red-500 text-[16px]">{state.errors.description[0]}</p>
        )}
      </Field>

      {/* Part */}
      <Field>
        <FieldLabel htmlFor="part">
          {isAddingState ? `Enter ${contentOfType} part` : `Edit ${contentOfType} part`}
        </FieldLabel>
        <Input
          id="part"
          name="part"
          type="number"
          placeholder={`Enter ${contentOfType} part`}
          className="border-3"
          defaultValue={isAddingState ? "" : contentForEditting?.[0]?.part || ""}
        />
        {state.errors?.part?.[0] && (
          <p className="text-red-500 text-[16px]">{state.errors.part[0]}</p>
        )}
      </Field>

      {/* Content Type */}
      <Field>
        <FieldLabel>Type of the content</FieldLabel>
        <Select value={contentTypeId} onValueChange={setContentTypeId}>
          <SelectTrigger>
            <SelectValue placeholder="Select type here." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {contentTypes.map(({ id, name }) => (
                <SelectItem value={id} key={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <input type="hidden" name="contentTypeId" value={contentTypeId} />
        {state.errors?.contentTypeId?.[0] && (
          <p className="text-red-500 text-[16px]">{state.errors.contentTypeId[0]}</p>
        )}
      </Field>

      {/* Category */}
      <Field>
        <FieldLabel>Category of the content</FieldLabel>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Select category here." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map(({ id, name }) => (
                <SelectItem value={id} key={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <input type="hidden" name="categoryId" value={categoryId} />
        {state.errors?.categoryId?.[0] && (
          <p className="text-red-500 text-[16px]">{state.errors.categoryId[0]}</p>
        )}
      </Field>
      {/* Tech */}
      <Field>
        <FieldLabel>Select tech type here.</FieldLabel>
        <Select value={techId} onValueChange={setTechId}>
          <SelectTrigger>
            <SelectValue placeholder="Select tech category here." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {techs.map(({ id, name }) => (
                <SelectItem value={id} key={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <input type="hidden" name="techId" value={techId} />
        {state.errors?.techId?.[0] && (
          <p className="text-red-500 text-[16px]">{state.errors.techId[0]}</p>
        )}
      </Field>

      {/* Actual Content */}
      <input type="hidden" name="activeContentType" value={contentOfType} />
      <Field>
        <FieldLabel
          htmlFor={
            contentOfType !== "video"
              ? `${contentOfType}-content-markdown`
              : `${contentOfType}-url`
          }
        >
          {isAddingState ? `Enter ${contentOfType}` : `Edit ${contentOfType}`}
        </FieldLabel>
        {contentOfType !== "video" ? (
          <Textarea
            id={`${contentOfType}-content-markdown`}
            name={`${contentOfType}-content-markdown`}
            placeholder={`${contentOfType} content markdown`}
            defaultValue={isAddingState ? "" : contentForEditting?.[0]?.content || ""}
          />
        ) : (
          <Input
            type="text"
            id={`${contentOfType}-url`}
            name={`${contentOfType}-url`}
            placeholder={`${contentOfType} content url`}
            defaultValue={isAddingState ? "" : contentForEditting?.[0]?.content || ""}
          />
        )}
        {state.errors?.actualContent?.[0] && (
          <p className="text-red-500 text-[16px]">{state.errors.actualContent[0]}</p>
        )}
      </Field>

      {/* Messages */}
      {state.success && (
        <p className="text-green-500 text-center text-[16px]">{state.message}</p>
      )}
      {!state.success && state.message && (
        <p className="text-red-500 text-center text-[16px]">{state.message}</p>
      )}

      {/* Submit / Cancel */}
      <div className="flex items-center justify-center gap-4 mt-3">
        <Button type="submit" className="cursor-pointer" disabled={pending}>
          {pending ? "Sending..." : isAddingState ? `Add ${contentOfType}` : `Edit ${contentOfType}`}
        </Button>
        <Button
          className="bg-red-600 hover:bg-red-500 cursor-pointer"
          type="button"
          disabled={pending}
          onClick={close}
        >
          {pending ? "Can't cancel" : "Cancel"}
        </Button>
      </div>
    </form>
  );
};

export default CommonFormElementForContents;
