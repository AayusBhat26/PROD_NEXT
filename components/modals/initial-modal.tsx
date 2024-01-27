"use client";
import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle
} from "../../components/ui/dialog";

export const InitialModal = () => {
      return <Dialog open={true}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                  <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                              CREATE A HUB
                        </DialogTitle>
                        <DialogDescription className="text-center text-blue-300">
                              Provide your HUB a personality make over.
                        </DialogDescription>
                  </DialogHeader>
            </DialogContent>
      </Dialog>
}