
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'

interface ConfirmDialogProps {
    IsConfirmModalOpen: boolean,
    setIsConfirmModalOpen: (open: boolean) => void;
}

export const ConfirmDialog = ({ IsConfirmModalOpen, setIsConfirmModalOpen }: ConfirmDialogProps) => {
    return (
        <div>
            <Dialog open={IsConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this item?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className='flex gap-3 md:gap-1'>
                        <Button type="submit">Delete</Button>
                        <Button variant="outline" >Cancel</Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </div>
    )
}
