"use client";
// package imports
import { useForm } from "react-hook-form";
import qs from "query-string"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ChannelType } from "@prisma/client";

// shadcn imports
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

// local uploads
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "../hooks/use-modal-store";
import {
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select"
// todo: form schema
const formSchema = z.object({
  name: z.string().min(1, {
    message: "SUB HUB name is required.",
    // preventing the subname as the general name
  }).refine(name => name !== "Common Chat" , {
    message:"Sub Hub name cannot be 'Common Chat '"
  }),
  type: z.nativeEnum(ChannelType)
});
export const CreateChannelModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "createChannel";

  // todo: form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", 
      // default type of sub hub is text.
      type:ChannelType.TEXT,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(params);
      
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: params?.hubsId
        }
      });
      await axios.post(url, values);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    form.reset();
    onClose();
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            CREATE A SUB HUB
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            suppressHydrationWarning
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-xs"
          >
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-blue-500 dark:text-secondary/60">
                      SUB-HUB NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/40 border-0 focus-visible:ring-1 text-black focus-visible:ring-offset-0"
                        placeholder="Enter the SUB-HUB Name."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-blue-300 font-bold text-xs" />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="type" render={({field})=>(<FormItem>
                <FormLabel>Sub Hub Type</FormLabel>
                <Select disabled={isLoading} onValueChange={field.onChange}  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger 
                    className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:rignt-offset-0 capitalize outline-none"
                    >
                      <SelectValue placeholder="Select A Sub Hub Type." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ChannelType).map((type)=>(
                      <SelectItem key={type} value={type} className="capitalize">
                        {
                          type.toLowerCase()
                        }
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>)}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button
                className="text-xs"
                variant={"initial"}
                disabled={isLoading}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
