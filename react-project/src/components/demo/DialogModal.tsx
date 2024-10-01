import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'

interface ConfirmDialogProps {
    IsDialogModalOpen: boolean,
    nameAction: string;
    setIsDialogModalOpen: (open: boolean) => void;
}

export const DialogModal = ({ IsDialogModalOpen, setIsDialogModalOpen, nameAction }: ConfirmDialogProps) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = () => {
        console.log("test", name, address, phone);
    }

    return (
        <div>
            <Dialog open={IsDialogModalOpen} onOpenChange={setIsDialogModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{nameAction}</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to seamlessly {nameAction} into the database
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-10">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-start">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="address" className="text-start">
                                    Address
                                </Label>
                                <Input
                                    id="address"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="address" className="text-start">
                                    Phone
                                </Label>
                                <Input
                                    id="address"
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className='w-full'>Add Data</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}