<AnimatePresence>
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: -260, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -260, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-64 bg-gradient-to-r from-[#004A87] to-[#0066B3] backdrop-blur-md text-white flex flex-col shadow-2xl z-30 border-r border-blue-700/40"
                    >
                        {/* Header Logo */}
                        <div className="p-5 flex items-center gap-3 bg-gradient-to-r from-blue-1200 to-blue-700/30 backdrop-blur-md border-b border-blue-700/50">
                            <div className="bg-yellow-400 p-2 rounded-lg flex items-center justify-center shadow-md">
                                <img
                                    src="https://cdn.unimagdalena.edu.co/images/escudo/bg_light/512.png"
                                    alt="Logo Unimagdalena"
                                    className="w-9 h-9 rounded-md"
                                />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">Admin Panel</h1>
                                <p className="text-sm text-blue-100">Unimagdalena</p>
                            </div>
                        </div>

                        {/* Navegación */}
                        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                            {menuItems.map((item) => (
                                <motion.div
                                    key={item.name}
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Link
                                        href="#"
                                        onClick={() => setActiveItem(item.name)}
                                        className={clsx(
                                            "flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200",
                                            activeItem === item.name
                                                ? "bg-blue-600/40 border-l-4 border-yellow-400 shadow-sm"
                                                : "hover:bg-blue-700/40 border-l-4 border-transparent"
                                        )}
                                    >
                                        <item.icon
                                            className={clsx(
                                                "h-5 w-5",
                                                activeItem === item.name ? "text-yellow-300" : "text-blue-100"
                                            )}
                                        />
                                        <span
                                            className={clsx(
                                                "font-medium text-sm",
                                                activeItem === item.name ? "text-white" : "text-blue-100"
                                            )}
                                        >
                                            {item.name}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Footer */}
                        <div className="p-4 text-center border-t border-blue-700/40 text-sm text-blue-100/90">
                            © 2025 Universidad del Magdalena
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>