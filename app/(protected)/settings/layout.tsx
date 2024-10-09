const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex overflow-x-hidden flex-col gap-y-10 p-12 bg-white ">
      {children}
    </div>
  )
}

export default ProtectedLayout
