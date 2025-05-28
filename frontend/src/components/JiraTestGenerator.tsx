import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import {Loader2, ExternalLink, Download, Copy, CheckCircle} from "lucide-react";
import {TaskCard} from "./TaskCard";
import {TestGenerator} from "./TestGenerator";
import {useToast} from "../hooks/use-toast";

interface JiraTask {
    key: string;
    summary: string;
    description: string;
    acceptanceCriteria: string[];
    status: string;
    assignee: string;
    priority: string;
}

interface GeneratedTest {
    id: string;
    title: string;
    description: string;
    steps: string[];
    expectedResult: string;
    category: string;
}

export function JiraTestGenerator() {
    const [taskKey, setTaskKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentTask, setCurrentTask] = useState<JiraTask | null>(null);
    const [generatedTests, setGeneratedTests] = useState<GeneratedTest[]>([]);
    const {toast} = useToast();

    // // Simulación de datos de Jira para demostración
    // const mockJiraTask: JiraTask = {
    //     key: "PROJ-123",
    //     summary: "Implementar sistema de autenticación de usuarios",
    //     description: "Como usuario, quiero poder registrarme e iniciar sesión en la aplicación para acceder a funcionalidades personalizadas.",
    //     acceptanceCriteria: [
    //         "El usuario debe poder registrarse con email y contraseña",
    //         "La contraseña debe tener al menos 8 caracteres",
    //         "El usuario debe recibir un email de confirmación",
    //         "El usuario debe poder iniciar sesión con credenciales válidas",
    //         "El sistema debe mostrar mensajes de error claros para credenciales inválidas",
    //         "El usuario debe poder cerrar sesión",
    //         "La sesión debe mantenerse activa por 24 horas"
    //     ],
    //     status: "In Progress",
    //     assignee: "Juan Pérez",
    //     priority: "High"
    // };

    const handleFetchTask = async () => {
        setIsLoading(true);

        try {
            // Simulación de llamada a la API de Jira
            await new Promise(resolve => setTimeout(resolve, 2000));

            // En producción, aquí harías la llamada real a Jira:
            const response = await fetch(`http://localhost:3001/api/jira/task/${taskKey}`);

            const content = await response.json()
            setCurrentTask(content);
            toast({
                title: "Tarea cargada",
                description: `Se ha cargado la tarea ${content.key} exitosamente`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo cargar la tarea de Jira",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateTests = (tests: GeneratedTest[]) => {
        setGeneratedTests(tests);
        toast({
            title: "Pruebas generadas",
            description: `Se han generado ${tests.length} casos de prueba`,
        });
    };

    return (
        <div className="space-y-6">
            {/* Configuración de Jira */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                        <ExternalLink className="w-5 h-5"/>
                        <span>Configuración de Jira</span>
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                        Conecta tu instancia de Jira para obtener las tareas
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex items-end space-x-4">
                        <div className="flex-1">
                            <Label htmlFor="taskKey" className="text-slate-700 font-medium">
                                Clave de la Tarea
                            </Label>
                            <Input
                                id="taskKey"
                                placeholder="PROJ-123"
                                value={taskKey}
                                onChange={(e) => setTaskKey(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <Button
                            onClick={handleFetchTask}
                            disabled={isLoading}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                                    Cargando...
                                </>
                            ) : (
                                "Cargar Tarea"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Tarea cargada */}
            {currentTask && (
                <TaskCard task={currentTask}/>
            )}

            {/* Generador de pruebas */}
            {currentTask && (
                <TestGenerator
                    task={currentTask}
                    onTestsGenerated={handleGenerateTests}
                />
            )}

            {/* Pruebas generadas */}
            {generatedTests.length > 0 && (
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
                        <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5"/>
                                <span>Pruebas Generadas ({generatedTests.length})</span>
                            </div>
                            <div className="flex space-x-2">
                                <Button size="sm" variant="outline"
                                        className="text-white border-white hover:bg-white/20">
                                    <Copy className="w-4 h-4 mr-1"/>
                                    Copiar
                                </Button>
                                <Button size="sm" variant="outline"
                                        className="text-white border-white hover:bg-white/20">
                                    <Download className="w-4 h-4 mr-1"/>
                                    Exportar
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            {generatedTests.map((test, index) => (
                                <div key={test.id} className="border rounded-lg p-4 bg-slate-50">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-semibold text-slate-800">
                                                Test #{index + 1}: {test.title}
                                            </h4>
                                            <Badge variant="outline" className="mt-1">
                                                {test.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 mb-3">{test.description}</p>

                                    <div className="space-y-3">
                                        <div>
                                            <strong className="text-slate-800">Pasos:</strong>
                                            <ol className="list-decimal list-inside mt-1 space-y-1">
                                                {test.steps.map((step, stepIndex) => (
                                                    <li key={stepIndex} className="text-slate-600">{step}</li>
                                                ))}
                                            </ol>
                                        </div>

                                        <div>
                                            <strong className="text-slate-800">Resultado Esperado:</strong>
                                            <p className="text-slate-600 mt-1">{test.expectedResult}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
