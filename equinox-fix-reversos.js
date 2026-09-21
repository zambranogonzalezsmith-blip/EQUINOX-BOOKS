(function(){
  function installFix(){
    const form = document.getElementById('formAsiento');
    if (!form || form.dataset.equinoxFix === 'done') return;
    form.dataset.equinoxFix = 'done';

    form.addEventListener('submit', function(e){
      e.preventDefault();

      const fecha = document.getElementById('asFecha')?.value || '';
      const concepto = document.getElementById('asConcepto')?.value.trim() || '';
      if (!fecha || !concepto) {
        if (typeof showAlert === 'function') {
          showAlert('Complete todos los campos del encabezado del asiento.','error');
        }
        return;
      }

      let totalDeb = 0, totalCred = 0;
      const lineas = [];
      document.querySelectorAll('#tbodyAsiento tr').forEach(tr => {
        const cod = tr.querySelector('.asCuenta')?.value || '';
        if (!cod) return;
        const d = typeof strToCents === 'function' ? strToCents(tr.querySelector('.asDeb')?.value || 0) : 0;
        const c = typeof strToCents === 'function' ? strToCents(tr.querySelector('.asCred')?.value || 0) : 0;
        const movFecha = tr.querySelector('.asMovFecha')?.value || fecha;
        const movRif = tr.querySelector('.asMovRif')?.value.trim() || '';
        const movConcepto = tr.querySelector('.asMovConcepto')?.value.trim() || '';
        if (d > 0 || c > 0) {
          totalDeb += d;
          totalCred += c;
          lineas.push({ codigo: cod, debito_centavos: d, credito_centavos: c, mov_fecha: movFecha, mov_tercero: movRif, mov_concepto: movConcepto });
        }
      });

      if (lineas.length < 2) {
        if (typeof showAlert === 'function') showAlert('Un asiento contable requiere al menos 2 movimientos con monto.','error');
        return;
      }
      if (totalDeb !== totalCred) {
        if (typeof showAlert === 'function') showAlert(`Error de Partida Doble: Débito (${typeof centsToStr === 'function' ? centsToStr(totalDeb) : totalDeb}) ≠ Crédito (${typeof centsToStr === 'function' ? centsToStr(totalCred) : totalCred}).`,'error');
        return;
      }

      const tc = typeof getExchangeRateForDate === 'function' ? getExchangeRateForDate(fecha) : null;

      if (typeof editandoAsiento !== 'undefined' && editandoAsiento !== null) {
        const origNum = editandoAsiento;
        const orig = Array.isArray(DB?.diario) ? DB.diario.filter(m => m.asiento_num === origNum && m.estado === 'ACTIVO') : [];
        if (!orig.length) {
          if (typeof showAlert === 'function') showAlert('El asiento #' + origNum + ' ya no existe. Modificación cancelada.','error');
          if (typeof cancelarEdicion === 'function') cancelarEdicion();
          return;
        }

        DB.diario = DB.diario.filter(m => !(m.asiento_num === origNum && m.estado === 'ACTIVO'));
        const terceroCab = (lineas[0] && lineas[0].mov_tercero) ? lineas[0].mov_tercero : '';
        for (const l of lineas) {
          DB.diario.push({
            id: DB.nextId++,
            asiento_num: origNum,
            fecha,
            concepto,
            tercero: terceroCab,
            codigo_cuenta: l.codigo,
            debito_centavos: l.debito_centavos,
            credito_centavos: l.credito_centavos,
            estado: 'ACTIVO',
            exchange_rate_bs: tc,
            mov_fecha: l.mov_fecha,
            mov_tercero: l.mov_tercero,
            mov_concepto: l.mov_concepto
          });
        }

        if (typeof saveDB === 'function') saveDB();
        if (typeof cancelarEdicion === 'function') cancelarEdicion();
        if (typeof showAlert === 'function') showAlert(`Asiento #${origNum} actualizado correctamente sin reversos ni eliminaciones.`, 'success');
        if (typeof renderAll === 'function') renderAll();
        return;
      }

      if (typeof siguienteAsiento === 'function') {
        const num = siguienteAsiento();
        const terceroCab = (lineas[0] && lineas[0].mov_tercero) ? lineas[0].mov_tercero : '';
        for (const l of lineas) {
          DB.diario.push({
            id: DB.nextId++,
            asiento_num: num,
            fecha,
            concepto,
            tercero: terceroCab,
            codigo_cuenta: l.codigo,
            debito_centavos: l.debito_centavos,
            credito_centavos: l.credito_centavos,
            estado: 'ACTIVO',
            exchange_rate_bs: tc,
            mov_fecha: l.mov_fecha,
            mov_tercero: l.mov_tercero,
            mov_concepto: l.mov_concepto
          });
        }
        if (typeof saveDB === 'function') saveDB();
        if (typeof renderAll === 'function') renderAll();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installFix);
  } else {
    installFix();
  }
})();
