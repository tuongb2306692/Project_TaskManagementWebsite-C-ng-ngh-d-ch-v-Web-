function formatZodErrors(error) {
    return error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
    }));
}

function validate(schemaOrSchemas) {
    return (req, res, next) => {
        try {
            
            if (schemaOrSchemas.safeParse) {
                const result = schemaOrSchemas.safeParse(req.body);

                if (!result.success) {
                    return res.status(400).json({
                        success: false,
                        message: 'Validation failed',
                        errors: formatZodErrors(result.error),
                    });
                }

                req.body = result.data;
                return next();
            }

            const { body, params, query } = schemaOrSchemas;

            if (body) {
                const result = body.safeParse(req.body);

                if (!result.success) {
                    return res.status(400).json({
                        success: false,
                        message: 'Validation failed',
                        errors: formatZodErrors(result.error),
                    });
                }

                req.body = result.data;
            }

            if (params) {
                const result = params.safeParse(req.params);

                if (!result.success) {
                    return res.status(400).json({
                        success: false,
                        message: 'Validation failed',
                        errors: formatZodErrors(result.error),
                    });
                }

                req.params = result.data;
            }

            if (query) {
                const result = query.safeParse(req.query);

                if (!result.success) {
                    return res.status(400).json({
                        success: false,
                        message: 'Validation failed',
                        errors: formatZodErrors(result.error),
                    });
                }

                req.query = result.data;
            }

            return next();
        } catch (error) {
            return next(error);
        }
    };
}

module.exports = validate;