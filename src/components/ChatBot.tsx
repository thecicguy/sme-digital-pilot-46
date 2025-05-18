
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";

const ChatBot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bottom-[80px] right-6 top-auto translate-y-0 translate-x-0 sm:max-w-[400px] data-[state=open]:slide-in-from-bottom-0">
          <div className="flex h-[500px] flex-col">
            <div className="border-b py-3 text-center font-medium">
              Chat with ConsultLink
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                <div className="ml-auto max-w-[80%] rounded-lg bg-primary p-3 text-primary-foreground">
                  How can I help you today?
                </div>
                <div className="max-w-[80%] rounded-lg bg-muted p-3">
                  Send a message to get started.
                </div>
              </div>
            </div>
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm">Send</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBot;
