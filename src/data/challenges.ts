export const challenges = [
  // Easy Challenges
  {
    id: '1',
    title: 'Select All Employees',
    difficulty: 'Easy',
    description: 'Write a query to select all employees from the employees table.',
    initialQuery: 'SELECT * FROM employees',
    expectedResult: [
      { id: 1, name: 'John Doe', department: 'Engineering' },
      { id: 2, name: 'Jane Smith', department: 'Marketing' },
    ],
    hint: 'Use the SELECT statement with * to retrieve all columns',
    explanation: 'The SELECT * statement retrieves all columns from the specified table. The * is a wildcard that represents all columns. This is the most basic form of a SELECT statement.',
    schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  department TEXT
);`,
  },
  {
    id: '2',
    title: 'Filter by Department',
    difficulty: 'Easy',
    description: 'Select all employees who work in the Engineering department.',
    initialQuery: "SELECT * FROM employees WHERE department = 'Engineering'",
    expectedResult: [
      { id: 1, name: 'John Doe', department: 'Engineering' },
    ],
    hint: 'Use the WHERE clause to filter results',
    explanation: 'The WHERE clause filters rows based on a condition. In this case, we\'re checking if the department column equals "Engineering". String comparisons in SQL require single quotes.',
    schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  department TEXT
);`,
  },
  {
    id: '3',
    title: 'Count Employees',
    difficulty: 'Easy',
    description: 'Count the total number of employees in the company.',
    initialQuery: 'SELECT COUNT(*) as employee_count FROM employees',
    expectedResult: [
      { employee_count: 10 }
    ],
    hint: 'Use the COUNT aggregate function',
    explanation: 'COUNT(*) is an aggregate function that counts the number of rows. The AS keyword allows us to give the result column a meaningful name (alias).',
    schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  department TEXT
);`,
  },
  // Medium Challenges
  {
    id: '4',
    title: 'Department Average Salary',
    difficulty: 'Medium',
    description: 'Calculate the average salary for each department, but only show departments with average salary above 75000.',
    initialQuery: `SELECT 
  department, 
  ROUND(AVG(salary), 2) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 75000
ORDER BY avg_salary DESC`,
    expectedResult: [
      { department: 'Engineering', avg_salary: 85000.00 },
      { department: 'Sales', avg_salary: 78500.50 },
    ],
    hint: 'Use GROUP BY with HAVING clause to filter grouped results',
    explanation: 'This query demonstrates several concepts:\n1. GROUP BY groups rows by department\n2. AVG() calculates the average salary\n3. ROUND() formats the number to 2 decimal places\n4. HAVING filters groups (similar to WHERE but for grouped data)\n5. ORDER BY sorts the results',
    schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  department TEXT,
  salary DECIMAL(10,2)
);`,
  },
  {
    id: '5',
    title: 'Employee Salary Rankings',
    difficulty: 'Medium',
    description: 'Rank employees by salary within their department and show only the top 3 paid employees in each department.',
    initialQuery: `WITH RankedEmployees AS (
  SELECT 
    name,
    department,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as salary_rank
  FROM employees
)
SELECT * FROM RankedEmployees
WHERE salary_rank <= 3
ORDER BY department, salary_rank`,
    expectedResult: [
      { name: 'Alice', department: 'Engineering', salary: 95000, salary_rank: 1 },
      { name: 'Bob', department: 'Engineering', salary: 92000, salary_rank: 2 },
    ],
    hint: 'Use a window function (RANK) with PARTITION BY',
    explanation: 'This query uses several advanced concepts:\n1. Common Table Expression (WITH clause)\n2. Window function RANK() to assign rankings\n3. PARTITION BY to restart ranking for each department\n4. Subquery filtering to get top 3 ranks',
    schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  department TEXT,
  salary DECIMAL(10,2)
);`,
  },
  {
    id: '6',
    title: 'Monthly Revenue Growth',
    difficulty: 'Medium',
    description: 'Calculate the month-over-month revenue growth percentage for each product category.',
    initialQuery: `WITH MonthlyRevenue AS (
  SELECT 
    strftime('%Y-%m', order_date) as month,
    category,
    SUM(amount) as revenue
  FROM orders
  GROUP BY strftime('%Y-%m', order_date), category
)
SELECT 
  month,
  category,
  revenue,
  ROUND(((revenue - LAG(revenue) OVER (PARTITION BY category ORDER BY month))
    / LAG(revenue) OVER (PARTITION BY category ORDER BY month) * 100), 2) as growth_percent
FROM MonthlyRevenue
ORDER BY category, month`,
    expectedResult: [
      { month: '2023-01', category: 'Electronics', revenue: 50000, growth_percent: null },
      { month: '2023-02', category: 'Electronics', revenue: 55000, growth_percent: 10.00 },
    ],
    hint: 'Use LAG window function to access previous month\'s revenue',
    explanation: 'This complex query shows:\n1. Date formatting with strftime\n2. Window function LAG() to get previous value\n3. Percentage calculation\n4. NULL handling for first month\n5. Common Table Expression for cleaner code',
    schema: `CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  order_date DATE,
  category TEXT,
  amount DECIMAL(10,2)
);`,
  },
  // Hard Challenges
  {
    id: '7',
    title: 'Complex Joins with Hierarchical Data',
    difficulty: 'Hard',
    description: 'Find all employees who earn more than their department\'s manager, showing both employee and manager salaries.',
    initialQuery: `WITH ManagerSalaries AS (
  SELECT 
    d.id as dept_id,
    d.name as dept_name,
    m.name as manager_name,
    m.salary as manager_salary
  FROM departments d
  JOIN employees m ON d.manager_id = m.id
)
SELECT 
  e.name as employee_name,
  e.salary as employee_salary,
  ms.dept_name,
  ms.manager_name,
  ms.manager_salary,
  ROUND(((e.salary - ms.manager_salary) / ms.manager_salary * 100), 2) as salary_diff_percent
FROM employees e
JOIN ManagerSalaries ms ON e.department_id = ms.dept_id
WHERE e.salary > ms.manager_salary
ORDER BY salary_diff_percent DESC`,
    expectedResult: [
      { employee_name: 'Alice', employee_salary: 95000, dept_name: 'Engineering', manager_name: 'Bob', manager_salary: 90000, salary_diff_percent: 5.56 },
    ],
    hint: 'Use a CTE to first get manager salaries, then join with employees',
    explanation: 'This advanced query demonstrates:\n1. Common Table Expression for manager data\n2. Multiple table joins\n3. Salary comparison logic\n4. Percentage calculation\n5. Result ordering\n6. Complex WHERE clause filtering',
    schema: `CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT,
  manager_id INTEGER
);

CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  department_id INTEGER,
  salary DECIMAL(10,2)
);`,
  },
  {
    id: '8',
    title: 'Recursive Employee Hierarchy',
    difficulty: 'Hard',
    description: 'Display the complete employee hierarchy showing reporting relationships up to 5 levels deep, including the total number of reports (direct and indirect) for each manager.',
    initialQuery: `WITH RECURSIVE EmployeeHierarchy AS (
  -- Base case: top-level managers
  SELECT 
    id,
    name,
    manager_id,
    1 as level,
    CAST(name as TEXT) as hierarchy_path
  FROM employees
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Recursive case: employees with managers
  SELECT 
    e.id,
    e.name,
    e.manager_id,
    eh.level + 1,
    eh.hierarchy_path || ' > ' || e.name
  FROM employees e
  JOIN EmployeeHierarchy eh ON e.manager_id = eh.id
  WHERE eh.level < 5
),
ReportCounts AS (
  SELECT 
    manager_id,
    COUNT(*) as total_reports
  FROM EmployeeHierarchy
  WHERE manager_id IS NOT NULL
  GROUP BY manager_id
)
SELECT 
  eh.hierarchy_path,
  eh.level,
  COALESCE(rc.total_reports, 0) as total_reports
FROM EmployeeHierarchy eh
LEFT JOIN ReportCounts rc ON eh.id = rc.manager_id
ORDER BY eh.hierarchy_path`,
    expectedResult: [
      { hierarchy_path: 'John Smith', level: 1, total_reports: 3 },
      { hierarchy_path: 'John Smith > Alice Johnson', level: 2, total_reports: 2 },
    ],
    hint: 'Use a recursive CTE to build the hierarchy, then join with a subquery for report counts',
    explanation: 'This complex query shows advanced SQL concepts:\n1. Recursive Common Table Expression\n2. String concatenation for path building\n3. Level tracking\n4. Multiple CTEs\n5. Aggregation with GROUP BY\n6. LEFT JOIN to include managers with no reports\n7. COALESCE for NULL handling',
    schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  manager_id INTEGER REFERENCES employees(id)
);`,
  },
  {
    id: '9',
    title: 'Customer Cohort Analysis',
    difficulty: 'Hard',
    description: 'Perform a cohort analysis showing customer retention rates by month for each customer\'s signup cohort.',
    initialQuery: `WITH CustomerCohorts AS (
  SELECT 
    customer_id,
    strftime('%Y-%m', signup_date) as cohort_month,
    strftime('%Y-%m', order_date) as activity_month,
    julianday(order_date) - julianday(signup_date) as days_since_signup
  FROM customers c
  JOIN orders o ON c.id = o.customer_id
),
CohortSizes AS (
  SELECT 
    cohort_month,
    COUNT(DISTINCT customer_id) as cohort_size
  FROM CustomerCohorts
  GROUP BY cohort_month
),
RetentionByMonth AS (
  SELECT 
    cohort_month,
    activity_month,
    COUNT(DISTINCT customer_id) as active_customers,
    ROUND((days_since_signup / 30)) as month_number
  FROM CustomerCohorts
  GROUP BY cohort_month, activity_month
)
SELECT 
  r.cohort_month,
  cs.cohort_size,
  r.month_number,
  r.active_customers,
  ROUND(CAST(r.active_customers AS FLOAT) / cs.cohort_size * 100, 2) as retention_rate
FROM RetentionByMonth r
JOIN CohortSizes cs ON r.cohort_month = cs.cohort_month
ORDER BY r.cohort_month, r.month_number`,
    expectedResult: [
      { cohort_month: '2023-01', cohort_size: 100, month_number: 0, active_customers: 100, retention_rate: 100.00 },
      { cohort_month: '2023-01', cohort_size: 100, month_number: 1, active_customers: 85, retention_rate: 85.00 },
    ],
    hint: 'Break down the problem into steps: identify cohorts, calculate cohort sizes, then compute retention',
    explanation: 'This advanced analytics query demonstrates:\n1. Multiple CTEs for complex calculations\n2. Date manipulation functions\n3. Customer cohort identification\n4. Retention rate calculation\n5. ROUND and CAST for precise decimal handling\n6. Multiple aggregations\n7. Self-joining of derived tables',
    schema: `CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  signup_date DATE
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  order_date DATE
);`,
  },
] as const;