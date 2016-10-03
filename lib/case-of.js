
export default function caseOf(cases, def) {
  return cases.length === 0 ? def()
    : (cases[0][0]() ? cases[0][1]()
          : caseOf(cases.slice(1), def));
}
