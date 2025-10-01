module.exports.AuthRole = { function RequireAuthRole(role) {
    return  (req, res, next) => {
        
        const headerRole = req.headers['AuhtRole'] || req.headers['X-Auth-Role'];
       
        const  currentRole = (req.user && req.user.role) || headerRole; || 'user'; 
        if (currentRole !== role) {
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }; 
        
         }
        next();
    };
};

module.exports.AdminRoleView = function AdminRoleView(articles) { 
    return async (req, res, next) => {
        try {
            const headerRole = req.headers['AuhtRole'] || req.headers['X-Auth-Role'];
            const currentRole = (req.user && req.user.role) || headerRole || 'user';



