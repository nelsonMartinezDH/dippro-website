"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { User, Edit, Trash2, Save, Plus, AlertTriangle, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "framer-motion"

interface TeamMemberDto {
  idDto: number;
  nameDto: string;
  roleDto: string;
  descriptionDto: string;
  imageUrlDto: string;
}

const TeamManager: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMemberDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estados para creación
  const [newName, setNewName] = useState("")
  const [newRole, setNewRole] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newFile, setNewFile] = useState<File | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [confirmAdd, setConfirmAdd] = useState(false)

  // Estados para edición
  const [editingMember, setEditingMember] = useState<TeamMemberDto | null>(null)
  const [editName, setEditName] = useState("")
  const [editRole, setEditRole] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editNewFile, setEditNewFile] = useState<File | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [confirmEdit, setConfirmEdit] = useState(false)

  // Confirmación de eliminación
  const [deleteTarget, setDeleteTarget] = useState<TeamMemberDto | null>(null)

  const apiUrl = "http://localhost:5213/api/team"
  const baseServerUrl = "http://localhost:5213"

  const getFullImageUrl = (path: string) => (path.startsWith("http") ? path : `${baseServerUrl}${path}`)

  const fetchTeamMembers = () => {
    setLoading(true)
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data: TeamMemberDto[]) => {
        setTeamMembers(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error al cargar miembros:", err)
        setError("Error al cargar los datos del equipo.")
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const handleAddMember = async () => {
    if (!newName || !newRole) {
      alert("Por favor completa nombre y rol.")
      return
    }
    const formData = new FormData()
    formData.append("NameDto", newName)
    formData.append("RoleDto", newRole)
    formData.append("DescriptionDto", newDescription)
    if (newFile) formData.append("File", newFile)

    await fetch(`${apiUrl}/upload`, {
      method: "POST",
      body: formData,
    })

    fetchTeamMembers()
    setIsAddDialogOpen(false)
    setConfirmAdd(false)
    setNewName("")
    setNewRole("")
    setNewDescription("")
    setNewFile(null)
  }

  const openEditDialog = (member: TeamMemberDto) => {
    setEditingMember(member)
    setEditName(member.nameDto)
    setEditRole(member.roleDto)
    setEditDescription(member.descriptionDto)
    setEditNewFile(null)
    setIsEditDialogOpen(true)
  }

  const handleEditSave = async () => {
    if (!editingMember) return
    const formData = new FormData()
    formData.append("IdDto", editingMember.idDto.toString())
    formData.append("NameDto", editName)
    formData.append("RoleDto", editRole)
    formData.append("DescriptionDto", editDescription)
    if (editNewFile) formData.append("File", editNewFile)

    await fetch(`${apiUrl}/update/${editingMember.idDto}`, {
      method: "PUT",
      body: formData,
    })

    setIsEditDialogOpen(false)
    setConfirmEdit(false)
    setEditingMember(null)
    fetchTeamMembers()
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await fetch(`${apiUrl}/${deleteTarget.idDto}`, { method: "DELETE" })
    setDeleteTarget(null)
    fetchTeamMembers()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Cargando equipo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white pb-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Gestión de Equipo</h2>
                <p className="text-amber-100 text-sm mt-1">Administra los miembros del equipo institucional</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center h-80 hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="p-4 bg-amber-100 rounded-full mb-3">
                <Plus className="w-8 h-8 text-amber-600" />
              </div>
              <p className="text-amber-600 font-semibold text-lg">Añadir Miembro</p>
              <p className="text-gray-500 text-sm mt-1">Agregar nuevo integrante</p>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Añadir Nuevo Miembro</DialogTitle>
              <DialogDescription>Completa la información del nuevo integrante del equipo</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="newName">Nombre Completo</Label>
                <Input
                  id="newName"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newRole">Rol / Cargo</Label>
                <Input
                  id="newRole"
                  type="text"
                  placeholder="Ej: Director de Prácticas"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newDescription">Descripción</Label>
                <Textarea
                  id="newDescription"
                  placeholder="Breve descripción del miembro..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newFile">Fotografía</Label>
                <Input
                  id="newFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewFile(e.target.files ? e.target.files[0] : null)}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-gray-300">
                Cancelar
              </Button>
              <Button onClick={() => setConfirmAdd(true)} className="bg-amber-600 hover:bg-amber-700">
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {teamMembers.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No hay miembros registrados</p>
            <p className="text-sm mt-1">Comienza agregando el primer integrante del equipo</p>
          </div>
        ) : (
          teamMembers.map((member, index) => (
            <motion.div
              key={member.idDto}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-80 flex flex-col shadow-lg hover:shadow-xl transition-all duration-200 border-gray-200 overflow-hidden group">
                <CardContent className="p-6 flex flex-col items-center text-center flex-1">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden mb-4 flex items-center justify-center ring-4 ring-amber-100 group-hover:ring-amber-200 transition-all">
                    {member.imageUrlDto ? (
                      <img
                        src={getFullImageUrl(member.imageUrlDto) || "/placeholder.svg"}
                        alt={member.nameDto}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-amber-400" />
                    )}
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">{member.nameDto}</h4>
                  <p className="text-sm text-amber-600 font-medium mb-2">{member.roleDto}</p>
                  <p className="text-xs text-gray-600 line-clamp-3 flex-1">{member.descriptionDto}</p>
                  <div className="flex gap-2 mt-4 w-full">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(member)}
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => setDeleteTarget(member)} className="flex-1">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      <AlertDialog open={confirmAdd} onOpenChange={setConfirmAdd}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Plus className="h-6 w-6 text-amber-600" />
              </div>
              <AlertDialogTitle className="text-xl font-semibold">Confirmar Nuevo Miembro</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas agregar a <span className="font-semibold text-gray-900">{newName}</span> como{" "}
              <span className="font-semibold text-gray-900">{newRole}</span> al equipo?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel onClick={() => setConfirmAdd(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddMember} className="bg-amber-600 hover:bg-amber-700">
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Editar Miembro</DialogTitle>
            <DialogDescription>Actualiza la información del integrante del equipo</DialogDescription>
          </DialogHeader>
          {editingMember && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editName">Nombre Completo</Label>
                <Input
                  id="editName"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editRole">Rol / Cargo</Label>
                <Input
                  id="editRole"
                  type="text"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editDescription">Descripción</Label>
                <Textarea
                  id="editDescription"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editFile">Nueva Fotografía (opcional)</Label>
                <Input
                  id="editFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditNewFile(e.target.files ? e.target.files[0] : null)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-gray-300">
              Cancelar
            </Button>
            <Button onClick={() => setConfirmEdit(true)} className="bg-amber-600 hover:bg-amber-700">
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmEdit} onOpenChange={setConfirmEdit}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Edit className="h-6 w-6 text-amber-600" />
              </div>
              <AlertDialogTitle className="text-xl font-semibold">Confirmar Cambios</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas guardar los cambios realizados a{" "}
              <span className="font-semibold text-gray-900">{editName}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel onClick={() => setConfirmEdit(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleEditSave} className="bg-amber-600 hover:bg-amber-700">
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <AlertDialogTitle className="text-xl font-semibold text-red-600">Confirmar Eliminación</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base leading-relaxed">
              ¿Estás seguro de que deseas eliminar a{" "}
              <span className="font-semibold text-gray-900">{deleteTarget?.nameDto}</span> del equipo? Esta acción no se
              puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel onClick={() => setDeleteTarget(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default TeamManager