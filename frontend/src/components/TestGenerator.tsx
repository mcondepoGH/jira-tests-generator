
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Zap, Brain, Code, Smartphone } from "lucide-react";
import { useToast } from "../hooks/use-toast";

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

interface TestGeneratorProps {
  task: JiraTask;
  onTestsGenerated: (tests: GeneratedTest[]) => void;
}

export function TestGenerator({ task, onTestsGenerated }: TestGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [testType, setTestType] = useState("functional");
  const [coverage, setCoverage] = useState("comprehensive");
  const { toast } = useToast();

  const testTypes = [
    { value: "functional", label: "Pruebas Funcionales", icon: Code },
    { value: "ui", label: "Pruebas de UI/UX", icon: Smartphone },
    { value: "integration", label: "Pruebas de Integración", icon: Zap },
    { value: "all", label: "Todas las Categorías", icon: Brain }
  ];

  const coverageOptions = [
    { value: "basic", label: "Básico (Happy Path)" },
    { value: "comprehensive", label: "Completo (Happy + Edge Cases)" },
    { value: "exhaustive", label: "Exhaustivo (Todos los Escenarios)" }
  ];

  const generateMockTests = (): GeneratedTest[] => {
    const baseTests: GeneratedTest[] = [
      {
        id: "test-1",
        title: "Registro exitoso de usuario",
        description: "Verificar que un usuario puede registrarse exitosamente con datos válidos",
        steps: [
          "Navegar a la página de registro",
          "Ingresar un email válido (ej: test@ejemplo.com)",
          "Ingresar una contraseña de al menos 8 caracteres",
          "Hacer clic en el botón 'Registrarse'",
          "Verificar que aparece el mensaje de confirmación"
        ],
        expectedResult: "El usuario se registra exitosamente y recibe un email de confirmación",
        category: "Funcional"
      },
      {
        id: "test-2", 
        title: "Validación de contraseña débil",
        description: "Verificar que el sistema rechaza contraseñas que no cumplen los criterios mínimos",
        steps: [
          "Navegar a la página de registro",
          "Ingresar un email válido",
          "Ingresar una contraseña de menos de 8 caracteres (ej: '123')",
          "Intentar registrarse",
          "Verificar mensaje de error"
        ],
        expectedResult: "El sistema muestra un mensaje de error indicando que la contraseña debe tener al menos 8 caracteres",
        category: "Validación"
      },
      {
        id: "test-3",
        title: "Login con credenciales válidas",
        description: "Verificar que un usuario registrado puede iniciar sesión correctamente",
        steps: [
          "Navegar a la página de login",
          "Ingresar email registrado",
          "Ingresar contraseña correcta",
          "Hacer clic en 'Iniciar Sesión'",
          "Verificar redirección al dashboard"
        ],
        expectedResult: "El usuario accede exitosamente a su cuenta y es redirigido al dashboard",
        category: "Funcional"
      },
      {
        id: "test-4",
        title: "Login con credenciales inválidas",
        description: "Verificar que el sistema rechaza credenciales incorrectas con mensajes claros",
        steps: [
          "Navegar a la página de login",
          "Ingresar email incorrecto o contraseña incorrecta",
          "Hacer clic en 'Iniciar Sesión'",
          "Verificar mensaje de error",
          "Verificar que no se permite el acceso"
        ],
        expectedResult: "El sistema muestra un mensaje de error claro sin revelar si el email o la contraseña es incorrecta",
        category: "Seguridad"
      },
      {
        id: "test-5",
        title: "Logout exitoso",
        description: "Verificar que un usuario puede cerrar sesión correctamente",
        steps: [
          "Iniciar sesión en la aplicación",
          "Localizar el botón o enlace de 'Cerrar Sesión'",
          "Hacer clic en 'Cerrar Sesión'",
          "Verificar redirección a página de login",
          "Intentar acceder a página protegida"
        ],
        expectedResult: "La sesión se cierra correctamente y el usuario es redirigido al login sin acceso a páginas protegidas",
        category: "Funcional"
      }
    ];

    // Agregar más tests según el tipo y cobertura seleccionados
    if (coverage === "comprehensive" || coverage === "exhaustive") {
      baseTests.push({
        id: "test-6",
        title: "Persistencia de sesión por 24 horas",
        description: "Verificar que la sesión del usuario se mantiene activa durante 24 horas",
        steps: [
          "Iniciar sesión en la aplicación",
          "Cerrar el navegador",
          "Volver a abrir el navegador después de varias horas (pero menos de 24)",
          "Navegar a la aplicación",
          "Verificar que la sesión sigue activa"
        ],
        expectedResult: "El usuario permanece logueado sin necesidad de volver a introducir credenciales",
        category: "Funcional"
      });
    }

    if (testType === "ui" || testType === "all") {
      baseTests.push({
        id: "test-ui-1",
        title: "Responsividad del formulario de registro",
        description: "Verificar que el formulario de registro se adapta correctamente a diferentes tamaños de pantalla",
        steps: [
          "Abrir la página de registro en desktop",
          "Verificar layout y usabilidad",
          "Cambiar a vista tablet",
          "Verificar que el formulario se adapta correctamente",
          "Cambiar a vista móvil",
          "Verificar usabilidad en dispositivos pequeños"
        ],
        expectedResult: "El formulario es completamente funcional y usable en todos los tamaños de pantalla",
        category: "UI/UX"
      });
    }

    return baseTests;
  };

  const handleGenerateTests = async () => {
    setIsGenerating(true);
    console.log("Generating tests for task:", task.key, "Type:", testType, "Coverage:", coverage);

    try {
      // Simulación de generación de pruebas con IA
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const generatedTests = generateMockTests();
      onTestsGenerated(generatedTests);
      
      toast({
        title: "¡Pruebas generadas exitosamente!",
        description: `Se han creado ${generatedTests.length} casos de prueba basados en los criterios de aceptación`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron generar las pruebas automáticamente",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const selectedTestType = testTypes.find(t => t.value === testType);
  const selectedCoverage = coverageOptions.find(c => c.value === coverage);

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5" />
          <span>Generador Inteligente de Pruebas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Configuración de generación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tipo de Pruebas
              </label>
              <Select value={testType} onValueChange={setTestType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {testTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <type.icon className="w-4 h-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nivel de Cobertura
              </label>
              <Select value={coverage} onValueChange={setCoverage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {coverageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Información de criterios detectados */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-slate-800 mb-2">Análisis de Criterios</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-white">
                📝 {task.acceptanceCriteria.length} criterios detectados
              </Badge>
              <Badge variant="outline" className="bg-white">
                🎯 {selectedTestType?.label}
              </Badge>
              <Badge variant="outline" className="bg-white">
                📊 {selectedCoverage?.label}
              </Badge>
            </div>
          </div>

          {/* Botón de generación */}
          <Button 
            onClick={handleGenerateTests}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-3"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generando pruebas inteligentes...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Generar Batería de Pruebas
              </>
            )}
          </Button>

          {isGenerating && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="text-purple-700 font-medium">
                  Analizando criterios de aceptación y generando casos de prueba...
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
