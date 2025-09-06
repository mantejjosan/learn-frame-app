import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import companyInfo from "@/company";
import { signupFlow } from "@/lib/signupFlow";
import { api, setUserSession } from "@/lib/api";
import { SignupFormData } from "@/types/signup";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [formData, setFormData] = useState<SignupFormData>({
    role: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const steps = [
    { title: "Role Selection", description: "Choose your role" },
    { title: "Basic Information", description: "Enter your details" },
    { title: "Additional Questions", description: "Tell us more about yourself" },
    { title: "Review & Submit", description: "Review your information" }
  ];

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setFormData(prev => ({ ...prev, role }));
    setCurrentStep(1);
  };

  const handleInputChange = (field: string, value: string | string[] | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiselectChange = (questionId: string, option: string, checked: boolean) => {
    const currentValues = (formData[questionId] as string[]) || [];
    if (checked) {
      handleInputChange(questionId, [...currentValues, option]);
    } else {
      handleInputChange(questionId, currentValues.filter(v => v !== option));
    }
  };

  const getCurrentRole = () => {
    return signupFlow.roles.find(role => role.id === selectedRole);
  };

  const getCurrentQuestions = () => {
    const role = getCurrentRole();
    return role?.questions || [];
  };

  const getConditionalOptions = (question: any) => {
    if (question.conditional && question.conditionalOptions) {
      const conditionalValue = formData[question.conditional.questionId] as string;
      if (conditionalValue && question.conditionalOptions[conditionalValue]) {
        return question.conditionalOptions[conditionalValue];
      }
    }
    return question.options || [];
  };

  const renderQuestion = (question: any, index: number) => {
    const value = formData[question.id];
    const options = getConditionalOptions(question);

    switch (question.type) {
      case 'text':
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id}>{question.label}</Label>
            <Input
              id={question.id}
              type="text"
              value={value as string || ""}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              placeholder={`Enter ${question.label.toLowerCase()}`}
            />
          </div>
        );

      case 'number':
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id}>{question.label}</Label>
            <Input
              id={question.id}
              type="number"
              min={question.min}
              max={question.max}
              value={value as number || ""}
              onChange={(e) => handleInputChange(question.id, parseInt(e.target.value))}
              placeholder={`Enter ${question.label.toLowerCase()}`}
            />
          </div>
        );

      case 'select':
        return (
          <div key={question.id} className="space-y-3">
            <Label>{question.label}</Label>
            <RadioGroup
              value={value as string || ""}
              onValueChange={(value) => handleInputChange(question.id, value)}
              className="grid grid-cols-1 gap-3"
            >
              {options.map((option: string) => (
                <div key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                  <Label htmlFor={`${question.id}-${option}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'multiselect':
        return (
          <div key={question.id} className="space-y-3">
            <Label>{question.label}</Label>
            <div className="grid grid-cols-1 gap-3">
              {options.map((option: string) => (
                <div key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <Checkbox
                    id={`${question.id}-${option}`}
                    checked={((value as string[]) || []).includes(option)}
                    onCheckedChange={(checked) => handleMultiselectChange(question.id, option, checked as boolean)}
                  />
                  <Label htmlFor={`${question.id}-${option}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const generateStudentSummary = () => {
    const role = getCurrentRole();
    if (!role?.summaryTemplate) return "";

    return role.summaryTemplate
      .replace("{name}", formData.name as string)
      .replace("{schoolName}", formData.schoolName as string || "")
      .replace("{examType}", formData.examType as string || "")
      .replace("{goal}", formData.goal as string || "")
      .replace("{timeline}", formData.timeline as string || "");
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password mismatch",
        description: "Please make sure your passwords match."
      });
      return;
    }

    setIsLoading(true);

    try {
      const additionalData: Record<string, any> = {};
      const questions = getCurrentQuestions();

      questions.forEach(question => {
        if (formData[question.id] !== undefined) {
          additionalData[question.id] = formData[question.id];
        }
      });

      const response = await api.signup({
        email: formData.email as string,
        password: formData.password as string,
        role: formData.role as 'student' | 'educator',
        name: formData.name as string,
        additionalData
      });

      if (response.success) {
        setUserSession(response.data, formData.role as 'student' | 'educator');
        toast({
          title: "Account created successfully!",
          description: `Welcome to ${companyInfo.name}.`
        });

        if (formData.role === "student") {
          navigate("/student");
        } else {
          navigate("/educator");
        }
      } else {
        throw new Error(response.message || "Signup failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">{signupFlow.welcomeMessage}</h2>
              <p className="text-muted-foreground">Select your role to get started</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {signupFlow.roles.map((role) => (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedRole === role.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{role.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {role.id === 'student' ? 'Learn and achieve your goals' : 'Share knowledge and teach others'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name as string}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email as string}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password as string}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword as string}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {getCurrentQuestions().map((question, index) => renderQuestion(question, index))}
          </div>
        );

      case 3:
        const role = getCurrentRole();
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Your Information</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role:</span>
                  <span className="font-medium">{role?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>

                {getCurrentQuestions().map((question) => {
                  const value = formData[question.id];
                  if (!value) return null;

                  return (
                    <div key={question.id} className="flex justify-between">
                      <span className="text-muted-foreground">{question.label}:</span>
                      <span className="font-medium">
                        {Array.isArray(value) ? value.join(", ") : value}
                      </span>
                    </div>
                  );
                })}
              </div>

              {selectedRole === 'student' && (
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold mb-2">Your Learning Journey</h4>
                  <p className="text-sm text-muted-foreground">{generateStudentSummary()}</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {companyInfo.name}
            </span>
          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Join thousands of learners and educators
          </CardDescription>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-sm font-medium">{steps[currentStep].title}</p>
            <p className="text-xs text-muted-foreground">{steps[currentStep].description}</p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
            {renderStepContent()}

            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto"
                  disabled={
                    (currentStep === 0 && !selectedRole) ||
                    (currentStep === 1 && (!formData.name || !formData.email || !formData.password || !formData.confirmPassword))
                  }
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" className="ml-auto" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              )}
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-4">
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;