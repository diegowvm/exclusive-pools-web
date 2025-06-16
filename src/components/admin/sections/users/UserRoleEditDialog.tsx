
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { User } from "./types";

interface UserRoleEditDialogProps {
  user: User;
  onUpdateRole: (userId: string, newRole: string) => Promise<void>;
}

export function UserRoleEditDialog({ user, onUpdateRole }: UserRoleEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newRole, setNewRole] = useState(user.role || 'vendedor');

  const handleSave = async () => {
    await onUpdateRole(user.id, newRole);
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setNewRole(user.role || 'vendedor');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setNewRole(user.role || 'vendedor')}
        >
          <Edit className="w-4 h-4 mr-1" />
          Editar Role
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar Role do Usuário</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Usuário</Label>
            <p className="text-sm text-slate-600">{user.full_name || user.email}</p>
          </div>
          <div>
            <Label htmlFor="role">Nova Role</Label>
            <Select value={newRole} onValueChange={setNewRole}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="vendedor">Vendedor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar Alterações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
