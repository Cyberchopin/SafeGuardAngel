import React from 'react';

const Education = () => {
  const courses = [
    { title: '识别暴力行为', description: '学习如何识别潜在的暴力行为' },
    { title: '自我保护技巧', description: '掌握自我保护的基本技巧' },
    { title: '心理健康与支持', description: '了解心理健康的重要性及可用资源' },
    { title: '法律知识', description: '学习有关保护自己权利的法律知识' },
  ];

  return (
    <div className="education-container">
      <h1 className="text-3xl font-bold text-center mb-6">教育与意识提升</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-700">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education; 