
import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/layout/Layout";
import { motion } from "framer-motion";

// Types for form data
type FormData = {
  childName: string;
  age: number;
  gender: "male" | "female";
  weight: number;
  height: number;
  headCircumference?: number;
  birthWeight?: number;
  exclusiveBreastfeeding: "yes" | "no" | "partial";
};

// Risk levels
type RiskLevel = "low" | "medium" | "high";

// Result type
type AssessmentResult = {
  riskLevel: RiskLevel;
  heightForAge: string;
  weightForHeight: string;
  bmi: number;
  recommendations: string[];
};

const StuntingAssessment = () => {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call or calculation delay
    setTimeout(() => {
      // Calculate BMI (simplified)
      const heightInMeters = data.height / 100;
      const bmi = data.weight / (heightInMeters * heightInMeters);
      
      // Simple stunting risk assessment logic (would be more complex in real implementation)
      let riskLevel: RiskLevel = "low";
      let heightForAge = "Normal";
      let weightForHeight = "Normal";
      
      // Very simplified logic - in a real app this would reference WHO growth standards
      if (data.age < 24) {
        // For children under 2 years
        if (data.height < 45 + (data.age * 0.5)) {
          heightForAge = "Pendek (Stunted)";
          riskLevel = "high";
        } else if (data.height < 45 + (data.age * 0.7)) {
          heightForAge = "Risiko Pendek";
          riskLevel = "medium";
        }
      } else {
        // For children 2-5 years
        if (data.height < 80 + ((data.age - 24) * 0.3)) {
          heightForAge = "Pendek (Stunted)";
          riskLevel = "high";
        } else if (data.height < 80 + ((data.age - 24) * 0.5)) {
          heightForAge = "Risiko Pendek";
          riskLevel = "medium";
        }
      }
      
      // Check weight for height (simplified)
      if (bmi < 14) {
        weightForHeight = "Kurus";
        riskLevel = riskLevel === "high" ? "high" : "medium";
      } else if (bmi > 19) {
        weightForHeight = "Gemuk";
      }
      
      // Generate recommendations based on risk level
      const recommendations = [];
      
      if (riskLevel === "high") {
        recommendations.push(
          "Segera konsultasikan dengan tenaga kesehatan di Puskesmas atau klinik terdekat.",
          "Pastikan anak mendapatkan makanan bergizi seimbang setiap hari.",
          "Berikan makanan tinggi protein seperti telur, ikan, tempe, dan tahu secara rutin.",
          "Tambahkan sayur dan buah dalam setiap makanan anak."
        );
      } else if (riskLevel === "medium") {
        recommendations.push(
          "Pantau pertumbuhan anak secara rutin setiap bulan di Posyandu.",
          "Tingkatkan asupan makanan bergizi terutama yang kaya protein dan zat besi.",
          "Pastikan anak mendapatkan cukup sayur dan buah setiap hari.",
          "Perhatikan kebersihan dan sanitasi untuk mencegah infeksi."
        );
      } else {
        recommendations.push(
          "Pertahankan pola makan sehat dan bergizi seimbang.",
          "Lanjutkan pemantauan pertumbuhan di Posyandu secara rutin.",
          "Berikan stimulasi yang cukup untuk mendukung tumbuh kembang anak.",
          "Pastikan anak mendapatkan imunisasi lengkap sesuai jadwal."
        );
      }
      
      setResult({
        riskLevel,
        heightForAge,
        weightForHeight,
        bmi,
        recommendations
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const renderRiskBadge = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case "low":
        return <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">Rendah</span>;
      case "medium":
        return <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">Sedang</span>;
      case "high":
        return <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">Tinggi</span>;
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-semar-green/10 to-white">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Penilaian Risiko Stunting
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Isi data anak Anda untuk mendapatkan penilaian risiko stunting dan rekomendasi yang sesuai.
            </p>
          </div>
          
          {!result ? (
            <div className="bg-white shadow rounded-lg p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="childName" className="block text-sm font-medium text-gray-700">
                      Nama Anak
                    </label>
                    <input
                      id="childName"
                      type="text"
                      {...register("childName", { required: "Nama anak harus diisi" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-semar-green focus:ring-semar-green sm:text-sm"
                    />
                    {errors.childName && (
                      <p className="mt-1 text-xs text-red-600">{errors.childName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Usia (bulan)
                    </label>
                    <input
                      id="age"
                      type="number"
                      min="0"
                      max="60"
                      {...register("age", { 
                        required: "Usia harus diisi", 
                        min: { value: 0, message: "Usia minimal 0 bulan" },
                        max: { value: 60, message: "Usia maksimal 60 bulan" }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-semar-green focus:ring-semar-green sm:text-sm"
                    />
                    {errors.age && (
                      <p className="mt-1 text-xs text-red-600">{errors.age.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                      Jenis Kelamin
                    </label>
                    <select
                      id="gender"
                      {...register("gender", { required: "Jenis kelamin harus dipilih" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-semar-green focus:ring-semar-green sm:text-sm"
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-xs text-red-600">{errors.gender.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                      Berat Badan (kg)
                    </label>
                    <input
                      id="weight"
                      type="number"
                      step="0.1"
                      min="0"
                      {...register("weight", { 
                        required: "Berat badan harus diisi",
                        min: { value: 0, message: "Berat badan harus lebih dari 0" }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-semar-green focus:ring-semar-green sm:text-sm"
                    />
                    {errors.weight && (
                      <p className="mt-1 text-xs text-red-600">{errors.weight.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                      Tinggi Badan (cm)
                    </label>
                    <input
                      id="height"
                      type="number"
                      step="0.1"
                      min="0"
                      {...register("height", { 
                        required: "Tinggi badan harus diisi",
                        min: { value: 0, message: "Tinggi badan harus lebih dari 0" }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-semar-green focus:ring-semar-green sm:text-sm"
                    />
                    {errors.height && (
                      <p className="mt-1 text-xs text-red-600">{errors.height.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="headCircumference" className="block text-sm font-medium text-gray-700">
                      Lingkar Kepala (cm) (opsional)
                    </label>
                    <input
                      id="headCircumference"
                      type="number"
                      step="0.1"
                      min="0"
                      {...register("headCircumference")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-semar-green focus:ring-semar-green sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="birthWeight" className="block text-sm font-medium text-gray-700">
                      Berat Lahir (kg) (opsional)
                    </label>
                    <input
                      id="birthWeight"
                      type="number"
                      step="0.1"
                      min="0"
                      {...register("birthWeight")}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-semar-green focus:ring-semar-green sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="exclusiveBreastfeeding" className="block text-sm font-medium text-gray-700">
                      ASI Eksklusif 6 Bulan Pertama
                    </label>
                    <select
                      id="exclusiveBreastfeeding"
                      {...register("exclusiveBreastfeeding", { required: "Wajib dipilih" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-semar-green focus:ring-semar-green sm:text-sm"
                    >
                      <option value="">Pilih</option>
                      <option value="yes">Ya, ASI Eksklusif</option>
                      <option value="partial">Sebagian (ASI + Susu Formula)</option>
                      <option value="no">Tidak, Hanya Susu Formula</option>
                    </select>
                    {errors.exclusiveBreastfeeding && (
                      <p className="mt-1 text-xs text-red-600">{errors.exclusiveBreastfeeding.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-semar-green hover:bg-semar-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-semar-green"
                  >
                    {isSubmitting ? "Memproses..." : "Analisis Risiko Stunting"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Hasil Penilaian</h2>
                  <div>{renderRiskBadge(result.riskLevel)}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Tinggi per Usia</p>
                    <p className="text-lg font-semibold text-gray-900">{result.heightForAge}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Berat per Tinggi</p>
                    <p className="text-lg font-semibold text-gray-900">{result.weightForHeight}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">BMI</p>
                    <p className="text-lg font-semibold text-gray-900">{result.bmi.toFixed(1)}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Rekomendasi</h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex">
                        <span className="flex-shrink-0 h-5 w-5 rounded-full bg-semar-green/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="h-2 w-2 rounded-full bg-semar-green" />
                        </span>
                        <span className="text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <p className="text-sm text-gray-500 mb-4">
                    <strong>Catatan:</strong> Hasil penilaian ini merupakan prediksi awal dan tidak menggantikan 
                    diagnosis dari tenaga medis profesional. Jika Anda khawatir dengan pertumbuhan anak, 
                    konsultasikan dengan dokter atau tenaga kesehatan.
                  </p>
                  
                  <button
                    onClick={() => setResult(null)}
                    className="w-full flex justify-center py-3 px-4 border border-semar-green rounded-md shadow-sm text-sm font-medium text-semar-green bg-white hover:bg-semar-green/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-semar-green"
                  >
                    Kembali ke Formulir
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StuntingAssessment;
